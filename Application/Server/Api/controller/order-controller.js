const {sequelize,Op} = require('../models/init-models')
const {findOne, findAll} = require('../services/order-service')
const validateService = require('../services/validate-service')
class OrderController{

    async get_order(req,res,next){
        try{
            validateService.validate(req)

            const {id} = req.params
            const {include} = req.query;
            
            res.json(await findOne({where:{id}},include))
        }catch(e){
            next(e)
        }
    }

    async get_orders(req,res,next){
        try{
            validateService.validate(req)

            const {include} = req.query;
            
            res.json(await findAll({},include))
        }catch(e){
            next(e)
        }
    }

    async get_orders_in_month(req,res,next){
        try{
            validateService.validate(req)

            const {include} = req.query;
            const {month,year} = req.params

            res.json(await findAll({
                where: {
                    [Op.and]:[
                        sequelize.where(sequelize.fn("date_part",'year',sequelize.col('date')), year),
                        sequelize.where(sequelize.fn("date_part",'month',sequelize.col('date')), month)
                    ]
                }
            },include))
        }catch(e){
            next(e)
        }
    }

    async delete_order(req,res,next){
        try{
            validateService.validate(req)

            const {id} = req.params

            let order = (await findOne({where:{id}},true)) 
            if(order.dataValues.list_services.isEmpty){
                return res.json({s:1})
            }
            
            await order.destroy({where:{id:order.dataValues.id}})
            res.json({s:100})
        }catch(e){
            next(e)
        }
    }

}
module.exports = new OrderController()