const {service, service_price} = require('../models/init-models')

class ServiceService{

    async findAll(option,all,include){
        if(include=="true"){
            option.include = {model:service_price, as:'price'}
        }
        if(all!="true"){
            if(!option.where) option.where = []
            option.where.push({is_active:true})
        }
        return await service.findAll(option)
    }

    async findOne(option,all,include){
        if(include=="true"){
            option.include = {model:service_price, as:'price'}
        }
        if(all!="true"){
            if(!option.where) option.where = []
            option.where.push({is_active:true})
        }
        return await service.findOne(option)
    }

    async create(option){
        const price = await service_price.create({price:option.price,is_time_based:option.is_time_based})
        return await service.create({name:option.name, price_id:price.id})
    }

    async update(field,option){
        if(field?.price == undefined){
            return await service.update(field,option)
        }else{
            const price = await service_price.create({price:field.price,is_time_based:field?.is_time_based})
            return await service.update({name:field.name, price_id:price.id}, option)
        }
    }

    async GetCount(option){
        return await service.count(option)
    }

}
module.exports = new ServiceService()