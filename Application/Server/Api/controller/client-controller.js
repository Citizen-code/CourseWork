const ApiError = require('../exception/error');
const {Op} = require('../models/init-models')
const {findOne,findAll, GetCount, update} = require('../services/client-service');
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
            
            const {include,pagination,page,text,order} = req.query;
            
            const option = { where:[], order:[] }
            if(text != undefined) option.where.push({
                [Op.or]:[
                    {surname:{[Op.like]:`%${text}%`}},
                    {firstname:{[Op.like]:`%${text}%`}},
                    {lastname:{[Op.like]:`%${text}%`}},
                ]
            });
            if(order != undefined) option.order.push(['surname', order])

            if(pagination == "true"){
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
            const {text} = req.query;

            const option = { where:[], order:[] }
            if(text != undefined) option.where.push({
                [Op.or]:[
                    {surname:{[Op.like]:`%${text}%`}},
                    {firstname:{[Op.like]:`%${text}%`}},
                    {lastname:{[Op.like]:`%${text}%`}},
                ]
            });
            const count = await GetCount(option)
            res.json({
                count_items:count,
                count_pages:Math.ceil(count / parseInt(process.env.COUNT_ITEM_ON_PAGE || 10))
            })
        }catch(e){
           next(e)
        }
    }

    async edit_client(req,res,next){
        try{
            validateService.validate(req)

            const {id} = req.params;
            const {surname,firstname,lastname,birth_date,email,phone} = req.body
            let current_date = new Date();
            if(new Date(birth_date) > current_date.setFullYear(current_date.getFullYear()-18)) throw ApiError.BadRequest('Вы должны быть старше 18 лет')
            if(req.user.type == 'client' && id != req.user.id){
                throw ApiError.Forbidden();
            }
            await update({surname,firstname,lastname,birth_date,email,phone},{where:{id}})
            res.json({message:'Успешно'})
        }catch(e){
           next(e)
        }
    }
}
module.exports = new ClientController()