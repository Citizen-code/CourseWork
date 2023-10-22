const ApiError = require('../exception/error');
const {findOne,findAll} = require('../services/client-service')
const validateService = require('../services/validate-service')
class ClientController{
    async get_client(req,res,next){
        try{
            validateService.validate(req)

            const {id} = req.params
            const {include} = req.query;
            const user = req.user;

            if(user.type == 'client'){
                if(user.id != id){
                    throw ApiError.Forbidden()
                }    
            }
            let option = {
                where:{id}
            }

            res.json(await findOne(option,include))
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