const {sequelize,Op} = require('../models/init-models')
const {findOne, findAll, create, update, GetCount} = require('../services/car-service')
const validateService = require('../services/validate-service')
const ApiError = require('../exception/error')
class CarController{

    async get_car(req,res,next){
        try{
            validateService.validate(req)

            const {id} = req.params
            const {include} = req.query;
            const user = req.user;
            
            const option = {
                where:[
                    {id},
                    user.type === 'client'?{client_id:user.id}:undefined
                ]
            }
            res.json(await findOne(option, include))
        }catch(e){
            next(e)
        }
    }

    async get_cars(req,res,next){
        try{
            validateService.validate(req)

            const {include, pagination, page} = req.query;
            const user = req.user;
            
            const option = {
                where:user.type === 'client'?{client_id:user.id}:undefined,
                order:[['name', 'ASC']]
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

    async get_count_cars(req,res,next){
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

    async add_car(req,res,next){
        try{
            validateService.validate(req)

            const {number, name, release_year, mileage, vin, color, engine_id, photo_id} = req.body
            const user = req.user;

            await create({
                client_id: user.id,
                number,
                name,
                release_year,
                mileage,
                vin,
                color,
                engine_id,
                photo_id
            })

            res.json({message:"успешно"})
        }catch(e){
            next(e)
        }
    }

    async update_car(req,res,next){
        try{
            validateService.validate(req)

            const {number, name, release_year, mileage, vin, color, engine_id, photo_id} = req.body
            const {id} = req.params
            const user = req.user;
            
            const option = {
                number,
                name,
                release_year,
                mileage,
                vin,
                color,
                engine_id,
                photo_id
            }
            await update(option,{where:[{id},{client_id: user.type === 'client'? user.id : undefined}]})

            res.status(200).json({message:"Успешно"})
        }catch(e){
            next(e)
        }
    }

}
module.exports = new CarController()