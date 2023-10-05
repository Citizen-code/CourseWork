const mailService = require('./mail-service')
const {users} = require('../models/init-models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const tokenService = require('./token-service')
const ApiError = require('../exception/error')

class UserService{
    async registration(email,password,userData){
        const candidate = await users.findOne({where:{email}})
        if(candidate){
            throw ApiError.BadRequest(`Пользователь с таким ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password,process.env.PASSWORD_SALT)
        const activationLink = uuid.v4()
        const user = await users.create({
            email:email,
            password:hashPassword,
            activationLink:activationLink
        })
        await mailService.sendActivationMail(email,`${process.env.API_URL}/api/activate/${activationLink}`)
        return await tokenService.createToken({id:user.id},user.id,userData)
    }

    async activation(activationLink){
        const user = await users.findOne({where:{activationLink}})
        if(!user){
            throw ApiError.BadRequest("Некорректная ссылка активации")
        }
        user.isActivate = true
        await user.save()
    }

    async login(email,password,userData){
        const user =await users.findOne({where:{email}})
        if(!user){
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password,user.password)
        if(!isPassEquals){
            throw ApiError.BadRequest('Неверный пароль')
        }

        const {refreshToken,accessToken} = tokenService.generateToken({id:user.id})
        await tokenService.saveToken(refreshToken,user.id,userData)

        return{
            accessToken,
            refreshToken
        }
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken,userData){
        if(!refreshToken){
            throw ApiError.UnauthorizeError()
        }
        const refresh_sessions = await tokenService.validateRefreshToken(refreshToken)
        if(!refresh_sessions){
            throw ApiError.UnauthorizeError()
        }

        return await tokenService.createToken({id:refresh_sessions.userId},refresh_sessions.userId,userData)
    }
}

module.exports = new UserService()