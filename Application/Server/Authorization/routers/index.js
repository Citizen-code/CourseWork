const Router = require("express").Router
const {body, param, cookie} = require('express-validator')
const ClientController = require('../controllers/client-controller')
const EmployeeController = require('../controllers/employee-controller')
const ValidateController = require('../controllers/validate-controller')
let router = Router()

router.post('/registration',
    body('email').isEmail().isLength({max:30}),
    body('password').isString().isLength({max:32,min:3}),
    body('birth_date').optional().isDate(),
    body('surname').isString().isLength({max:20}),
    body('firstname').isString().isLength({max:20}),
    body('lastname').optional().isString().isLength({max:20}),
    body('phone').optional().isString().isLength({max:20}),
    ClientController.registration)

router.post('/login/client',
    body('email').isEmail(),
    body('password').isString().isLength({max:32}),
    ClientController.login)

router.post('/login/employee',
    body('login').isString().isLength({max:40}),
    body('password').isString().isLength({max:40}),
    EmployeeController.login)

router.post('/logout/client',
    cookie('refreshToken').isJWT(),
    ClientController.logout)

router.post('/logout/employee',
    cookie('refreshToken').isJWT(),
    EmployeeController.logout)

router.get('/refresh/client',
    cookie('refreshToken').isJWT(),
    ClientController.refresh)

router.get('/refresh/employee',
    cookie('refreshToken').isJWT(),
    EmployeeController.refresh)

router.get('/validate', ValidateController.validate)

//router.get('/activate/:link', 
//    param('link').isUUID(),
//    ClientController.activate)

module.exports = router