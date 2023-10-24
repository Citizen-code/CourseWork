const {findOne,findAll,update, create} = require('../services/service-service')
const validateService = require('../services/validate-service')

class ServiceController{
    async get_service(req,res,next){
        try{
            validateService.validate(req)

            const {id} = req.params;
            const {all} = req.query;
            
            res.json(await findOne({where:{id},order:[['name', 'ASC']]},all))
        }catch(e){
           next(e)
        }
    }

    async get_services(req,res,next){
        try{
            validateService.validate(req)

            const {all,pagination, page} = req.query;
            let option = {
                order:[['name', 'ASC']]
            }
            if(pagination == "true"){
                option.limit = parseInt(process.env.COUNT_ITEM_ON_PAGE || 10)
                option.offset = option.limit * (page - 1)
            }

            res.json(await findAll(option,all))
        }catch(e){
           next(e)
        }
    }

    async add_service(req,res,next){
        try{
            validateService.validate(req)

            const {name,price,is_hourly} = req.body

            await create({name,price,is_hourly})

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