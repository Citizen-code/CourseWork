const clientService = require('../services/client-service')
const tokenService = require('../services/token-service')
const ApiError = require('../exception/error')
const validateService = require('../services/validate-service')

class ClientController{
    async registration(req,res,next){
        try{
            validateService.validate(req)

            let {email,password, surname, firstname, lastname, birth_date, phone} = req.body
            let data = await clientService.registration(email,password, surname, firstname, lastname, birth_date, phone)

            res.cookie('refreshToken',data.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
            return res.json(data)
        }catch(e){
           next(e)
        }
    }

    async login(req,res,next){
        try{
            validateService.validate(req)

            const {email, password} = req.body
            const data = await clientService.login(email, password)

            res.cookie('refreshToken', data.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
            return res.json(data)
        }catch(e){
            next(e)
        }
    }

    async logout(req,res,next){
        try{
            validateService.validate(req)

            const {refreshToken} = req.cookies
            const token = await clientService.logout(refreshToken)

            res.clearCookie('refreshToken')
            return res.json({message:'Успешно'})
        }catch(e){
            next(e)
        }
    }

    async refresh(req,res,next){
        try{
            validateService.validate(req)

            const {refreshToken} = req.cookies
            const data = await clientService.refresh(refreshToken)

            res.cookie('refreshToken',data.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
            return res.json(data)
        }catch(e){
            next(e)
        }
    }

    async activate(req,res,next){
        try{
            validateService.validate(req)

            const activationLink = req.params.link
            await clientService.activation(activationLink)

            return res.redirect(process.env.CLIENT_URL)//Заменить
        }catch(e){
            next(e)
        }
    }

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
module.exports = new ClientController()