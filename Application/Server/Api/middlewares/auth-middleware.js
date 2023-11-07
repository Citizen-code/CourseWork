const ApiError = require('../exception/error')
const axios = require('axios')

module.exports = function (accesses = []) {
    return async function (req,res,next){
        try{
            const accessToken = req.headers.authorization.split(' ')[1]
            const userData = (await axios.get(`${process.env.AUTH_URL}/auth/validate/`,{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            })).data
            if(!userData) return next(ApiError.UnauthorizeError())
            if(!accesses.includes(userData.type)) return next(ApiError.Forbidden())

            req.user = userData
            next()
        }catch(e){
            return next(ApiError.UnauthorizeError())
        }
    }
}