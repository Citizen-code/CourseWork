const {findOne,findAll,update, create, GetCount} = require('../services/service-service')
const validateService = require('../services/validate-service')
const {Op} = require('../models/init-models')


class ServiceController{
    async get_service(req,res,next){
        try{
            validateService.validate(req)

            const {id} = req.params;
            const {include} = req.query;
            const {all} = req.query;

            res.json(await findOne({where:{id},order:[['name', 'ASC']]},all,include))
        }catch(e){
           next(e)
        }
    }

    async get_services(req,res,next){
        try{
            validateService.validate(req)

            const {all,pagination, page, include, order, text} = req.query;

            const option = { where:[], order:[] }
            if(text != undefined) option.where.push({name:{[Op.like]:`%${text}%`}});
            if(order != undefined) option.order.push(['name', order])

            if(pagination == "true"){
                option.limit = parseInt(process.env.COUNT_ITEM_ON_PAGE || 10)
                option.offset = option.limit * (page - 1)
            }

            res.json(await findAll(option,all,include))
        }catch(e){
           next(e)
        }
    }

    async get_count_services(req,res,next){
        try{
            const {all,text} = req.query;

            const option = { where:[], order:[] }
            if(text != undefined) option.where.push({name:{[Op.like]:`%${text}%`}});

            if(!all){
                option.where.push({is_active:true})
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

    async add_service(req,res,next){
        try{
            validateService.validate(req)

            const {name,price,is_time_based} = req.body
            await create({name,price,is_time_based})

            res.status(200).json({message:"Успешно"})
        }catch(e){
            next(e)
        }
    }

    async update_service(req,res,next){
        try{
            validateService.validate(req)

            const {name,price,is_time_based} = req.body
            const {id} = req.params
            
            const option = {
                name,
                price,
                is_time_based
            }

            await update(option,{where:{id}})

            res.status(200).json({message:"Успешно"})
        }catch(e){
            next(e)
        }
    }

    async delete_service(req,res,next){
        try{
            validateService.validate(req)

            const {id} = req.params

            let is_active = false;
            await update({is_active},{where:{id}})

            res.status(200).json({message:"Успешно"})
        }catch(e){
            next(e)
        }
    }
}
module.exports = new ServiceController()