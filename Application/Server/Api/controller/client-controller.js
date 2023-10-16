const {findOne,findAll} = require('../services/client-service')
class ClientController{
    async get_client(req,res,next){
        try{
            const {id} = req.params
            const {include} = req.query;
            
            res.json(await findOne({where:{id}},include))
        }catch(e){
           next(e)
        }
    }

    async get_clients(req,res,next){
        try{
            const {include} = req.query;

            res.json(await findAll({},include))
        }catch(e){
           next(e)
        }
    }
}
module.exports = new ClientController()