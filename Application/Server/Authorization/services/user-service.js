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
        const {refreshToken,accessToken} = tokenService.generateToken({id:user.id})
        await tokenService.saveToken(refreshToken,user.id,userData)

        return{
            accessToken,
            refreshToken
        }
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

    async refresh(_refreshToken,userData){
        if(!_refreshToken){
            throw ApiError.UnauthorizeError()
        }
        const token = await tokenService.findToken(_refreshToken)
        if(!token){
            throw ApiError.UnauthorizeError()
        }
        const isCorrect = await tokenService.validateRefreshToken(token)
        if(!isCorrect){
            throw ApiError.UnauthorizeError()
        }

        const {refreshToken,accessToken} = tokenService.generateToken({id:token.userId})
        await tokenService.saveToken(refreshToken,token.userId,userData)

        return{
            accessToken,
            refreshToken
        }
    }
}

module.exports = new UserService()