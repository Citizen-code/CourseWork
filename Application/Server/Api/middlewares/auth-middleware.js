const ApiError = require('../exception/error')
const jwt = require('jsonwebtoken')

module.exports = function (accesses = []) {
    return function (req,res,next){
        try{
            const accessToken = req.headers.authorization.split(' ')[1]

            const userData = jwt.decode(accessToken)
            if(!userData) return next(ApiError.UnauthorizeError())
            
            if(!accesses.includes(userData.type)) return next(ApiError.Forbidden())

            req.user = userData
            next()
        }catch(e){
            return next(ApiError.UnauthorizeError())
        }
    }
}