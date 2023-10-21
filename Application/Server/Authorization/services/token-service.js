const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const {refresh_session_client, refresh_session_employee} = require('../models/init-models')
class TokenService{

    generateToken(payload){
        let accessToken = jwt.sign(payload,process.env.JWT_ACCESS_SECRET,{expiresIn:'30m'})
        let refreshToken = jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{expiresIn:'30d'})
        
        return{
            accessToken,
            refreshToken
        }
    }

    async saveEmployeeToken(refreshToken, employee_id){
        await refresh_session_employee.create({
            employee_id,
            refreshToken
        })
    }

    async saveClientToken(refreshToken, client_id){
        await refresh_session_client.create({
            client_id,
            refreshToken
        })
    }
    
    async removeClientToken(refreshToken){
        const token = await refresh_session_client.destroy({where:{refreshToken}})
        return token
    }

    async removeEmployeeToken(refreshToken){
        const token = await refresh_session_employee.destroy({where:{refreshToken}})
        return token
    }

    async findRefreshSessionsClient(refreshToken){
        const token = await refresh_session_client.findOne({where:{refreshToken}})
        return token
    }

    async findRefreshSessionsEmployee(refreshToken){
        const token = await refresh_session_employee.findOne({where:{refreshToken}})
        return token
    }

    validateAccessToken(token){
        const data = jwt.verify(token,process.env.JWT_ACCESS_SECRET)
        return data
    }

    validateRefreshToken(token){
        const data = jwt.verify(token,process.env.JWT_REFRESH_SECRET)
        return data
    }

    async verifyRefreshToken(refreshToken){
        const data = this.validateRefreshToken(refreshToken);
        let refresh_sessions; 
        switch(data.type){
            case "client":
                refresh_sessions = await findRefreshSessionsClient(refreshToken);
                await this.removeClientToken(refreshToken)
                break
            case "employee":
                refresh_sessions = await findRefreshSessionsEmployee(refreshToken);
                await this.removeEmployeeToken(refreshToken)
                break
            default:
                return false
        }

        if(!refresh_sessions || !data) return false
        return refresh_sessions
        
    }
}

module.exports = new TokenService()