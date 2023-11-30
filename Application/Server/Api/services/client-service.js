const {client,car, engine, photo} = require('../models/init-models')

class ClientService{

    async findAll(option,include=undefined){
        if(include=="true"){
            option.include = {model:car, as:'car', include:[{model:engine, as:'engine'},{model:photo, as:'photo'} ]} 
        }
        return await client.findAll(option)
    }

    async findOne(option,include=undefined){
        if(include=="true"){
            option.include = {model:car, as:'car', include:[{model:engine, as:'engine'},{model:photo, as:'photo'} ] } 
        }
        return await client.findOne(option)
    }
    
    async GetCount(option){
        return await client.count(option)
    }

    async update(option,where){
        if(option.email != undefined){
            const candidate = await client.findOne({where:{email:option.email}})
            if(candidate){
                throw ApiError.BadRequest(`Клиент с таким ${email} уже существует`)
            }
        }
        return await client.update(option,where)
    }
}
module.exports = new ClientService()