const ApiError = require('../exception/error')
const jwt = require('jsonwebtoken')

module.exports = function (access = '', object = 'params', param = 'id') {
    return function (req,res,next){
        try{
            if(req.user.type != access)
                return next()
            
            if(req.user[param] != req[object][param])
                return next(ApiError.Forbidden())
            
            next()
        }catch(e){
            return next(ApiError.UnauthorizeError())
        }
    }
}