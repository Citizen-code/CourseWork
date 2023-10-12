const {client,car} = require('../models/init-models')
const {findOne,findAll} = require('../services/client-service')
class ClientController{
    async get_client(req,res,next){
        try{
            const id = req.params['id']
            const {include_car} = req.query;
            
            res.json(await findOne({where:{id}},include_car))
        }catch(e){
           next(e)
        }
    }

    async get_clients(req,res,next){
        try{
            const {include_car} = req.query;

            res.json(await findAll({},include_car))
        }catch(e){
           next(e)
        }
    }
}
module.exports = new ClientController()