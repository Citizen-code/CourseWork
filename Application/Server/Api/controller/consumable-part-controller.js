const {findOne,findAll,update, create, GetCount} = require('../services/consumable-part-service')
const validateService = require('../services/validate-service')
const {Op} = require('../models/init-models')


class ConsumablePartController{
    async get_consumable_part(req,res,next){
        try{
            validateService.validate(req)

            const {id} = req.params;
            const {include} = req.query;

            res.json(await findOne({where:{id},order:[['name', 'ASC']]},include))
        }catch(e){
           next(e)
        }
    }

    async get_consumable_parts(req,res,next){
        try{
            validateService.validate(req)

            const {include,pagination, page, text, order} = req.query;

            const option = { where:[], order:[] }
            if(text != undefined) option.where.push({name:{[Op.like]:`%${text}%`}});
            if(order != undefined) option.order.push(['price', order])

            if(pagination == "true"){
                option.limit = parseInt(process.env.COUNT_ITEM_ON_PAGE || 10)
                option.offset = option.limit * (page - 1)
            }

            res.json(await findAll(option,include))
        }catch(e){
           next(e)
        }
    }

    async get_count_consumable_parts(req,res,next){
        try{
            const {text} = req.query;

            const option = { where:[], order:[] }
            if(text != undefined) option.where.push({name:{[Op.like]:`%${text}%`}});
            
            const count = await GetCount(option)
            res.json({
                count_items:count,
                count_pages:Math.ceil(count / parseInt(process.env.COUNT_ITEM_ON_PAGE || 10))
            })
        }catch(e){
           next(e)
        }
    }

    async add_consumable_part(req,res,next){
        try{
            validateService.validate(req)

            const {brand,article,name,price,measure_unit,photo_id} = req.body

            await create({brand,article,name,price,measure_unit,photo_id})

            res.status(200).json({message:"Успешно"})
        }catch(e){
            next(e)
        }
    }

    async update_consumable_part(req,res,next){
        try{
            validateService.validate(req)

            const {brand,article,name,price,measure_unit,photo_id} = req.body
            const {id} = req.params
            
            const option = {brand,article,name,price,measure_unit,photo_id}

            await update(option,{where:{id}})

            res.status(200).json({message:"Успешно"})
        }catch(e){
            next(e)
        }
    }
}
module.exports = new ConsumablePartController()