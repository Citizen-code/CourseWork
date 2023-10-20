const {findOne,findAll} = require('../services/client-service')
const validateService = require('../services/validate-service')
class ClientController{
    async get_client(req,res,next){
        try{
            validateService.validate(req)

            const {id} = req.params
            const {include} = req.query;
            
            res.json(await findOne({where:{id}},include))
        }catch(e){
           next(e)
        }
    }

    async get_clients(req,res,next){
        try{
            validateService.validate(req)
            
            const {include} = req.query;

            res.json(await findAll({},include))
        }catch(e){
           next(e)
        }
    }
}
module.exports = new ClientController()