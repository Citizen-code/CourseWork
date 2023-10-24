const {order,list_services,service,status_order} = require('../models/init-models')

class OrderService{

    async findAll(option,include=undefined){
        if(include){
            option.include = [{model:list_services, as:'list_services', include:{model:service, as:'service'}},{model:status_order, as:'status'}] 
        }
        return await order.findAll(option)
    }

    async findOne(option,include=undefined){
        if(include){
            option.include = [{model:list_services, as:'list_services', include:{model:service, as:'service'}},{model:status_order, as:'status'}] 
        }
        return await order.findOne(option)
    }
    
    async create(option){
        option.status_id = 2
        return await order.create(option)
    }

    async GetCount(option){
        return await order.count(option)
    }
}
module.exports = new OrderService()