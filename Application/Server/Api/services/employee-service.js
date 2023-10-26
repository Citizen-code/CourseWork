const {employee, photo} = require('../models/init-models')

class EmployeeService{

    async findAll(option,include=undefined){
        if(include=="true"){
            option.include = {model:photo, as:'photo'}
        }
        return await employee.findAll(option)
    }

    async findOne(option,include=undefined){
        if(include=="true"){
            option.include = {model:photo, as:'photo'}
        }
        return await employee.findOne(option)
    }
    
    async GetCount(option){
        return await employee.count(option)
    }
}
module.exports = new EmployeeService()