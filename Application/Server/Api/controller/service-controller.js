const {findOne,findAll,update} = require('../services/service-service')
 
class ServiceController{
    async get_service(req,res,next){
        try{
            const {id} = req.params;
            const {all} = req.query;
            res.json(await findOne({where:{id},order:[['name', 'ASC']]},all))
        }catch(e){
           next(e)
        }
    }

    async get_services(req,res,next){
        try{
            const {all} = req.query;
            res.json(await findAll({order:[['name', 'ASC']]},all))
        }catch(e){
           next(e)
        }
    }

    async delete_service(req,res,next){
        try{
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