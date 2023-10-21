const {client,car, engine} = require('../models/init-models')

class ClientService{

    async findAll(option,include=undefined){
        if(include){
            option.include = {model:car, as:'car', include:{model:engine, as:'engine'} } 
        }
        return await client.findAll(option)
    }

    async findOne(option,include=undefined){
        if(include){
            option.include = {model:car, as:'car', include:{model:engine, as:'engine'} } 
        }
        return await client.findOne(option)
    }

}
module.exports = new ClientService()