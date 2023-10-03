const {validationResult} = require('express-validator')
const UserService = require('../services/user-service')
const {users, refresh_sessions} = require('../models/init-models')
const userService = require('../services/user-service')
const ApiError = require('../exception/error')

class UserController{
    async registration(req,res,next){
        try{
            let errors = validationResult(req)
            if(!errors.isEmpty()){
                throw ApiError.BadRequest('Ошибка при валидации', errors.array())
            } 
            let {email,password} = req.body
            let data = await UserService.registration(email,password,{})
            res.cookie('refreshToken',data.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
            return res.json(data)
        }catch(e){
           next(e)
        }
    } 

    async login(req,res,next){
        try{
            const {email, password} = req.body
            const data = await userService.login(email, password, {})
            res.cookie('refreshToken',data.refreshToken,{maxAge:process.env.REFRESH_MAX_AGE,httpOnly:true})
            return res.json(data)
        }catch(e){
            next(e)
        }
    } 

    async logout(req,res,next){
        try{
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        }catch(e){
            next(e)
        }
    }

    async refresh(req,res,next){
        try{
            const {refreshToken} = req.cookies
            const data = await userService.refresh(refreshToken,{})
            res.cookie('refreshToken',data.refreshToken,{maxAge:process.env.REFRESH_MAX_AGE,httpOnly:true})
            return res.json(data)
        }catch(e){
            next(e)
        }
    } 

    async activate(req,res,next){
        try{
            const activationLink = req.params.link
            await userService.activation(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        }catch(e){
            next(e)
        }
    } 

    async getUsers(req,res,next){
        try{
            return res.json(await users.findAll({include:{model:refresh_sessions, as:'refreshsessions'}}))
        }catch(e){
            next(e)
        }
    } 

}
module.exports = new UserController()