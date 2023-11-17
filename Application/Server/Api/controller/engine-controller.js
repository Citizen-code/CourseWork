const {findAll} = require('../services/engine-service');
const validateService = require('../services/validate-service')

class EngineController{
    async get_engines(req,res,next){
        try{
            validateService.validate(req)

            res.json(await findAll({}))
        }catch(e){
           next(e)
        }
    }
}
module.exports = new EngineController()