const {car, photo} = require('../models/init-models')

class OrderService{

    async findAll(option,include=undefined){
        if(include){
            option.include = {model:photo, as:'photo'}
        }
        return await car.findAll(option)
    }

    async findOne(option,include=undefined){
        if(include){
            option.include = {model:photo, as:'photo'}
        }
        return await car.findOne(option)
    }
    
    async create(option){
        return await car.create(option)
    }

    async update(field,option){
        return await car.update(field,option)
    }

    async GetCount(option){
        return await car.count(option)
    }
}
module.exports = new OrderService()