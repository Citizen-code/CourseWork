const {findOne, findAll, GetCount} = require('../services/employee-service')
const validateService = require('../services/validate-service')
class EmployeeController{

    async get_employee(req,res,next){
        try{
            validateService.validate(req)

            const {id} = req.params
            const {include} = req.query;
            let option = {
                where:{id}
            }
            res.json(await findOne(option, include))
        }catch(e){
            next(e)
        }
    }

    async get_employees(req,res,next){
        try{
            validateService.validate(req)

            const {include, pagination, page} = req.query;
            
            const option = {
                order:[['surname', 'ASC']]
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

    async get_count_employees(req,res,next){
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
module.exports = new EmployeeController()