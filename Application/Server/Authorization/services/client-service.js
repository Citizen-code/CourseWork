const mailService = require('./mail-service')
const {clients,authorization_client} = require('../models/init-models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const tokenService = require('./token-service')
const ApiError = require('../exception/error')

class ClientService{
    async registration(email,password,surname, firstname, lastname, birth_date, phone){
        const candidate = await clients.findOne({where:{email}})
        if(candidate){
            throw ApiError.BadRequest(`Клиент с таким ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password,parseInt(process.env.PASSWORD_SALT))
        const activationLink = uuid.v4()

        const client = await clients.create({
            email,
            surname,
            firstname,
            lastname,
            birth_date,
            phone
        })
        await authorization_client.create({
            client_id:client.id,
            password: hashPassword,
            //activationLink:activationLink
        })

        //await mailService.sendActivationMail(email,`${process.env.API_URL}/api/activate/${activationLink}`)
        const {refreshToken,accessToken} = tokenService.generateToken({id:client.id, type:"client"})
        await tokenService.saveClientToken(refreshToken,client.id)

        return{
            accessToken,
            refreshToken
        }
    }

    async activation(activationLink){
        const client = await clients.findOne({where:{activationLink}})
        if(!client){
            throw ApiError.BadRequest("Некорректная ссылка активации")
        }
        client.isActivate = true
        await client.save()
    }

    async login(email,password){
        const client = await clients.findOne({where:{email},include:{model:authorization_client, as:'authorization_clients'}})
        if(!client){
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password,client.authorization_clients[0].password)
        if(!isPassEquals){
            throw ApiError.BadRequest('Неверный пароль')
        }

        const {refreshToken,accessToken} = tokenService.generateToken({id:client.id, type:"client"})
        await tokenService.saveClientToken(refreshToken,client.id)

        return{
            accessToken,
            refreshToken
        }
    }

    async logout(refreshToken){
        const token = await tokenService.removeClientToken(refreshToken)
        return token
    }

    async refresh(refreshTokenOld){
        const payload = tokenService.verifyRefreshToken(refreshTokenOld)
        if(!payload){
            throw ApiError.UnauthorizeError()
        }
        const {refreshToken,accessToken} = tokenService.generateToken({id:payload.id, type:"client"})
        await tokenService.saveClientToken(refreshToken, payload.id)

        return{
            accessToken,
            refreshToken
        }
    }
}

module.exports = new ClientService()