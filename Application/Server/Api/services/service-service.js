const {service} = require('../models/init-models')

class ServiceService{

    async findAll(option,all){
        if(!all){
            if(!option.where) option.where = {} 
            option.where.is_active = true 
        }
        return await service.findAll(option)
    }

    async findOne(option,all){
        if(!all){
            if(!option.where) option.where = {} 
            option.where.is_active = true 
        }
        return await service.findOne(option)
    }

    async create(option){
        return await service.create(option)
    }

    async update(field,option){
        return await service.update(field,option)
    }

    async GetCount(option){
        return await service.count(option)
    }

}
module.exports = new ServiceService()