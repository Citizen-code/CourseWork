const {authorization_employee} = require('../models/init-models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const tokenService = require('./token-service')
const ApiError = require('../exception/error')

class EmployeeService{

    async login(login, password){
        const authorization = await authorization_employee.findOne({where:{login}})
        if(!authorization){
            throw ApiError.BadRequest('Работник с таким login не найден')
        }
        const isPassEquals = await bcrypt.compare(password,authorization.password)
        if(!isPassEquals){
            throw ApiError.BadRequest('Неверный пароль')
        }

        const {refreshToken,accessToken} = tokenService.generateToken({id:authorization.employee_id, type:"employee"})
        await tokenService.saveEmployeeToken(refreshToken, authorization.employee_id)

        return{
            accessToken,
            refreshToken
        }
    }

    async logout(refreshToken){
        const token = await tokenService.removeEmployeeToken(refreshToken)
        return token
    }

    async refresh(refreshTokenOld){
        const payload = tokenService.validateRefreshToken(refreshTokenOld)
        if(!payload){
            throw ApiError.UnauthorizeError()
        }
        const {refreshToken,accessToken} = tokenService.generateToken({id:payload.id, type:"employee"})
        await tokenService.saveEmployeeToken(refreshToken, payload.id)

        return{
            accessToken,
            refreshToken
        }
    }
}

module.exports = new EmployeeService()