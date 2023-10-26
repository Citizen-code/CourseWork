const {consumable_part,photo} = require('../models/init-models')

class ConsumablePartService{

    async findAll(option,include){
        if(include=="true"){
            option.include = {model:photo, as:'photo'}
        }
        return await consumable_part.findAll(option)
    }

    async findOne(option,include){
        if(include=="true"){
            option.include = {model:photo, as:'photo'}
        }
        return await consumable_part.findOne(option)
    }

    async create(option){
        return await consumable_part.create(option)
    }

    async update(field,option){
        return await consumable_part.update(field,option)
    }

    async GetCount(option){
        return await consumable_part.count(option)
    }

}
module.exports = new ConsumablePartService()