const ApiError = require('../exception/error')
const tokenService = require('../services/token-service')

class EmployeeController{

    async validate(req,res,next){
        try{
            const authorizationHeader = req.headers.authorization
            if(!authorizationHeader) return next(ApiError.UnauthorizeError())
    
            const accessToken = authorizationHeader.split(' ')[1]
            if(!accessToken) return next(ApiError.UnauthorizeError())
            const userData = tokenService.validateAccessToken(accessToken)

            if(!userData) return next(ApiError.UnauthorizeError())
            return res.json(userData)
        }catch(e){
            return next(ApiError.UnauthorizeError())
        }
    }
}

module.exports = new EmployeeController()