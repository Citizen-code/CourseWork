const {sequelize, Op} = require('../models/init-models')
const {findOne, findAll, create, GetCount,create_content,update} = require('../services/order-service')
const validateService = require('../services/validate-service')
const ApiError = require('../exception/error')
class OrderController{

    async get_order(req,res,next){
        try{
            validateService.validate(req)

            const {id} = req.params
            const {include} = req.query;
            const user = req.user;
            
            const option = {
                where:[
                    {id},
                    user.type === 'client'?{client_id:user.id}:undefined
                ]
            }

            res.json(await findOne(option, include))
        }catch(e){
            next(e)
        }
    }

    async get_orders(req,res,next){
        try{
            validateService.validate(req)

            const {include, pagination, page, status} = req.query;

            const option = {
                where:status != undefined ? {status_id:status} : undefined,
                order:[['date', 'ASC']]
            }

            if(pagination == "true"){
                option.limit = parseInt(process.env.COUNT_ITEM_ON_PAGE || 10)
                option.offset = option.limit * (page - 1)
            }
            res.json(await findAll(option,include))
        }catch(e){
            next(e)
        }
    }

    async get_orders_client(req,res,next){
        try{
            validateService.validate(req)

            const {id} = req.params
            const {include, pagination, page, status} = req.query;
            const user = req.user;

            const option = {
                where:[
                    user.type === 'client'?{client_id:user.id}:{client_id:id},
                    status != undefined?{status_id:status}:undefined
                ],
                order:[['date', 'DESC']]
            }
            if(pagination == "true"){
                option.limit = parseInt(process.env.COUNT_ITEM_ON_PAGE || 10)
                option.offset = option.limit * (page - 1)
            }
            res.json(await findAll(option,include))
        }catch(e){
            next(e)
        }
    }

    async get_count_orders(req,res,next){
        try{
            const {status} = req.query;
            const count = await GetCount({where:status != undefined?{status_id:status}:undefined})
            res.json({
                count_items:count,
                count_pages:Math.ceil(count / parseInt(process.env.COUNT_ITEM_ON_PAGE || 10))
            })
        }catch(e){
           next(e)
        }
    }

    async get_count_orders_client(req,res,next){
        try{
            const {id} = req.params
            const user = req.user;
            const {status} = req.query;
            const option = {
                where:[
                    user.type === 'client'?{client_id:user.id}:{client_id:id},
                    status != undefined?{status_id:status}:undefined
                ],
            }
            const count = await GetCount(option)
            res.json({
                count_items:count,
                count_pages:Math.ceil(count / parseInt(process.env.COUNT_ITEM_ON_PAGE || 10))
            })
        }catch(e){
           next(e)
        }
    }

    async get_orders_in_month(req,res,next){
        try{
            validateService.validate(req)

            const {include} = req.query;
            const {month,year} = req.params

            res.json(await findAll({
                where: {
                    [Op.and]:[
                        sequelize.where(sequelize.fn("date_part",'year',sequelize.col('date')), year),
                        sequelize.where(sequelize.fn("date_part",'month',sequelize.col('date')), month)
                    ]
                },
                order:[['date', 'ASC']]
            },include))
        }catch(e){
            next(e)
        }
    }

    async get_orders_time_in_day(req,res,next){
        try{
            validateService.validate(req)

            const {date} = req.params
            const status_id = 4
            res.json(await findAll({ 
                where: {
                    date,
                    status_id: {[Op.ne]: status_id }
            }, attributes:['time'] },"false"))
        }catch(e){
            next(e)
        }
    }

    async delete_order(req,res,next){
        try{
            validateService.validate(req)

            const {id} = req.params
            const user = req.user;

            let option = {
                where:[
                    {id},
                    user.type === 'client'?{client_id:user.id}:undefined
                ]
            }
            let order = (await findOne(option,"true")) 
            if(!order){
                throw ApiError.BadRequest("Заказ не найден");
            }
            if(order.status_id == 4){
                throw ApiError.BadRequest("Заказ уже отменен");
            }
            if(order.list_services.length != 0){
                throw ApiError.BadRequest("Заказ не должен содержать услуги")
            }
            if(order.list_consumable_parts.length != 0){
                throw ApiError.BadRequest("Заказ не должен содержать детали")
            }
            
            await order.update({status_id:4})

            res.json({message:"Успешно"})
        }catch(e){
            next(e)
        }
    }

    async add_order(req,res,next){
        try{
            validateService.validate(req)

            const {comment, date, time} = req.body
            const user = req.user;

            console.log((new Date(`${date} ${time}`) < new Date()))
            if((new Date(`${date} ${time}`) < new Date())){
                throw ApiError.BadRequest('Дата и время не должны быть меньше текущей даты и времени');
            }
            const status_id = 4
            const busy_times = await findAll({ where: {date, status_id: {[Op.ne]: status_id }}, attributes:['time'] },"false")
            if(busy_times.find((i)=> { return i.time == `${time}:00` }) != undefined){
                throw ApiError.BadRequest('Время уже занято');
            }

            await create({
                client_id: user.id,
                comment,
                date,
                time
            })

            res.json({message:"успешно"})
        }catch(e){
            next(e)
        }
    }

    async add_content_order(req,res,next){
        try{
            validateService.validate(req)

            const {id} = req.params
            const {list_services, list_consumable_parts} = req.body
            const user = req.user;

            await update({
                status_id:1,
                employee_id:user.id
            },{where:{id}})

            await create_content(id,list_services,list_consumable_parts)

            res.json({message:"успешно"})
        }catch(e){
            next(e)
        }
    }

}
module.exports = new OrderController()