const {validationResult} = require('express-validator')
const ClientService = require('../services/client-service')
const {clients, refresh_session} = require('../models/init-models')
const tokenService = require('../services/token-service')
const ApiError = require('../exception/error')

class ClientController{
    async registration(req,res,next){
        try{
            let errors = validationResult(req)
            if(!errors.isEmpty()){
                throw ApiError.BadRequest('Ошибка при валидации', errors.array())
            } 

            let {email,password, surname, firstname, lastname, birth_date, phone} = req.body
            let data = await ClientService.registration(email,password, surname, firstname, lastname, birth_date, phone)

            res.cookie('refreshToken',data.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
            return res.json(data)
        }catch(e){
           next(e)
        }
    } 

    async login(req,res,next){
        try{
            const {email, password} = req.body
            const data = await ClientService.login(email, password)
            res.cookie('refreshToken', data.refreshToken,{maxAge:process.env.REFRESH_MAX_AGE,httpOnly:true})
            return res.json(data)
        }catch(e){
            next(e)
        }
    } 

    async logout(req,res,next){
        try{
            const {refreshToken} = req.cookies
            const token = await ClientService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        }catch(e){
            next(e)
        }
    }

    async refresh(req,res,next){
        try{
            const {refreshToken} = req.cookies
            const data = await ClientService.refresh(refreshToken)
            res.cookie('refreshToken',data.refreshToken,{maxAge:process.env.REFRESH_MAX_AGE,httpOnly:true})
            return res.json(data)
        }catch(e){
            next(e)
        }
    } 

    async activate(req,res,next){
        try{
            const activationLink = req.params.link
            await ClientService.activation(activationLink)
            return res.redirect(process.env.CLIENT_URL)
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

    async getClient(req,res,next){
        try{
            return res.json(await clients.findAll({include:{model:refresh_session, as:'refresh_session'}}))
        }catch(e){
            next(e)
        }
    } 

}
module.exports = new ClientController()