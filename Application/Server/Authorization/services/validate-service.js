const {validationResult} = require('express-validator')
const ApiError = require('../exception/error')

class ValidateService{
    validate(req){
        let errors = validationResult(req)
        if(!errors.isEmpty()){
            throw ApiError.BadRequest('Ошибка при валидации', errors.array())
        }
    }
}

module.exports = new ValidateService()