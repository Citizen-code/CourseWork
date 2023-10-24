const {client,car, engine, photo} = require('../models/init-models')

class ClientService{

    async findAll(option,include=undefined){
        if(include){
            option.include = {model:car, as:'car', include:[{model:engine, as:'engine'},{model:photo, as:'photo'} ]} 
        }
        return await client.findAll(option)
    }

    async findOne(option,include=undefined){
        if(include){
            option.include = {model:car, as:'car', include:[{model:engine, as:'engine'},{model:photo, as:'photo'} ] } 
        }
        return await client.findOne(option)
    }
    
    async GetCount(option){
        return await client.count(option)
    }
}
module.exports = new ClientService()