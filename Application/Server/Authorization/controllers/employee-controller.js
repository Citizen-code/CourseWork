const employeeService = require('../services/employee-service')
const validateService = require('../services/validate-service')

class EmployeeController{
    
    async login(req,res,next){
        try{
            validateService.validate(req)

            const {login, password} = req.body
            const data = await employeeService.login(login, password)

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
            const token = await employeeService.logout(refreshToken)

            res.clearCookie('refreshToken')
            return res.json(token)
        }catch(e){
            next(e)
        }
    }

    async refresh(req,res,next){
        try{
            validateService.validate(req)

            const {refreshToken} = req.cookies
            const data = await employeeService.refresh(refreshToken)

            res.cookie('refreshToken', data.refreshToken, {maxAge:30*24*60*60*1000,httpOnly:true})
            return res.json(data)
        }catch(e){
            next(e)
        }
    }

}
module.exports = new EmployeeController()