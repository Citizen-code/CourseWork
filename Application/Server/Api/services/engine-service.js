const {engine} = require('../models/init-models')

class OrderService{

    async findAll(option){
        return await engine.findAll(option)
    }
}
module.exports = new OrderService()