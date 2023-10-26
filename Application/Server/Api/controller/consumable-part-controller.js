const {findOne,findAll,update, create, GetCount} = require('../services/consumable-part-service')
const validateService = require('../services/validate-service')

class ConsumablePartController{
    async get_consumable_part(req,res,next){
        try{
            validateService.validate(req)

            const {id,include} = req.params;
            
            res.json(await findOne({where:{id},order:[['name', 'ASC']]},include))
        }catch(e){
           next(e)
        }
    }

    async get_consumable_parts(req,res,next){
        try{
            validateService.validate(req)

            const {include,pagination, page} = req.query;
            let option = {
                order:[['name', 'ASC']]
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

    async get_count_consumable_parts(req,res,next){
        try{
            const count = await GetCount({})
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

            const {name,price,is_hourly} = req.body

            await create({name,price,is_hourly})

            res.status(200).json({message:"Успешно"})
        }catch(e){
            next(e)
        }
    }

    async update_consumable_part(req,res,next){
        try{
            validateService.validate(req)

            const {name,price,is_hourly} = req.body
            const {id} = req.params
            
            const option = {
                name,
                price,
                is_hourly
            }

            await update(option,{where:{id}})

            res.status(200).json({message:"Успешно"})
        }catch(e){
            next(e)
        }
    }
}
module.exports = new ConsumablePartController()