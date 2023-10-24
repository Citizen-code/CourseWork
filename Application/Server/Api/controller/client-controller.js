const ApiError = require('../exception/error');
const {findOne,findAll, GetCount} = require('../services/client-service')
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
            
            const {include,pagination,page} = req.query;
            let option = {
                order:[['surname', 'ASC']]
            }

            if(pagination===true){
                option.limit = parseInt(process.env.COUNT_ITEM_ON_PAGE || 10)
                option.offset = option.limit * (page - 1)
            }

            res.json(await findAll(option,include))
        }catch(e){
           next(e)
        }
    }

    async get_count_clients(req,res,next){
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
}
module.exports = new ClientController()