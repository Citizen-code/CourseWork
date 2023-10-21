const {sequelize,Op} = require('../models/init-models')
const {findOne, findAll, create} = require('../services/order-service')
const validateService = require('../services/validate-service')
const ApiError = require('../exception/error')
class OrderController{

    async get_order(req,res,next){
        try{
            validateService.validate(req)

            const {id} = req.params
            const {include} = req.query;
            
            res.json(await findOne({where:{id}},include))
        }catch(e){
            next(e)
        }
    }

    async get_orders(req,res,next){
        try{
            validateService.validate(req)

            const {include} = req.query;
            
            res.json(await findAll({order:[['date', 'ASC']]},include))
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

    async delete_order(req,res,next){
        try{
            validateService.validate(req)

            const {id} = req.params

            let order = (await findOne({where:{id}},true)) 
            if(order.list_services.length != 0){
                throw ApiError.BadRequest("Заказ не должен содержать услуги")
            }

            await order.destroy({where:{id:order.dataValues.id}})

            res.json({message:"успешно"})
        }catch(e){
            next(e)
        }
    }

    async add_order(req,res,next){
        try{
            validateService.validate(req)

            const {client_id, employee_id, date} = req.body
            
            await create({client_id, employee_id, date})

            res.json({message:"успешно"})
        }catch(e){
            next(e)
        }
    }

}
module.exports = new OrderController()