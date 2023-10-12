const {order,list_services,service} = require('../models/init-models')

class OrderService{

    async findAll(option,include=undefined){
        if(include){
            option.include = {model:list_services, as:'list_services', include:{model:service, as:'service'}} 
        }
        return await order.findAll(option)
    }

    async findOne(option,include=undefined){
        if(include){
            option.include = {model:list_services, as:'list_services', include:{model:service, as:'service'}} 
        }
        return await order.findOne(option)
    }
    

}
module.exports = new OrderService()