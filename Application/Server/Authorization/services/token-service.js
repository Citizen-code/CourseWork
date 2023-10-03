const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const {refresh_sessions} = require('../models/init-models')
class TokenService{
    generateToken(payload){
        let accessToken = jwt.sign(payload,process.env.JWT_ACCESS_SECRET)
        let refreshToken = uuid.v4()

        return{
            accessToken,
            refreshToken
        }
    }

    async saveToken(refreshToken,userId, data){
        await refresh_sessions.create({
            userId:userId,
            refreshToken:refreshToken,
            ua:data.ua,
            fingerprint:data.fingerprint,
            ip:data.ip,
            expiresIn:process.env.REFRESH_MAX_AGE
        })
    }

    async removeToken(refreshToken){
        const token = await refresh_sessions.destroy({where:{refreshToken}})
        return token
    }

    validateAccessToken(token){
        const data = jwt.verify(token,process.env.JWT_ACCESS_SECRET)
        return data
    }

    async validateRefreshToken(token){
        let expiresDate = token.createdAt.getTime() + (token.expiresIn / 1000)
        let nowDate = new Date().getTime()
        if(expiresDate < nowDate){
            await this.removeToken(token.refreshToken)
            return false
        }
        return true
    }

    async findToken(refreshToken){
        const token = await refresh_sessions.findOne({where:{refreshToken}})
        return token
    }
}

module.exports = new TokenService()