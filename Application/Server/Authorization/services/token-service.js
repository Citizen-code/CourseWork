const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const {refresh_sessions} = require('../models/init-models')
class TokenService{
    async createToken(payload,userId,userData){
        const tokens = this.generateToken(payload)
        await this.saveToken(tokens.refreshToken,userId,userData)
        return tokens
    }

    generateToken(payload){
        let accessToken = jwt.sign(payload,process.env.JWT_ACCESS_SECRET,{expiresIn:'30m'})
        let refreshToken = jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{expiresIn:'30d'})
        
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
            ip:data.ip
        })
    }

    validateAccessToken(token){
        const data = jwt.verify(token,process.env.JWT_ACCESS_SECRET)
        return data
    }
    verifyRefreshToken(token){
        const data = jwt.verify(token,process.env.JWT_REFRESH_SECRET)
        return data
    }
    async validateRefreshToken(refreshToken){
        const data = this.verifyRefreshToken(refreshToken);
        const refresh_sessions = await this.findRefreshSessions(refreshToken)
        await this.removeToken(refreshToken)
        if(!refresh_sessions || !data) return false
        return refresh_sessions
        
    }

    async findRefreshSessions(refreshToken){
        const token = await refresh_sessions.findOne({where:{refreshToken}})
        return token
    }

    async removeToken(refreshToken){
        const token = await refresh_sessions.destroy({where:{refreshToken}})
        return token
    }
}

module.exports = new TokenService()