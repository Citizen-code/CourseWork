const Router = require("express").Router
const {body, param, cookie} = require('express-validator')
const ClientController = require('../controllers/client-controller')
let router = Router()

router.post('/registration',
    body('email').isEmail().isLength({max:30}),
    body('password').isString().isLength({max:32,min:3}),//Дописать валидацию фио
    body('birth_date').isDate(),
    body('surname').isString().isLength({max:20}),
    body('firstname').isString().isLength({max:20}),
    body('lastname').isString().isLength({max:20}),
    body('phone').isString().isLength({max:20}),
    ClientController.registration)

router.post('/login',
    body('email').isEmail(),
    body('password').isString(),
    ClientController.login)

router.post('/logout',
    cookie('refreshToken').isJWT(),
    ClientController.logout)

router.get('/refresh',
    cookie('refreshToken').isJWT(),
    ClientController.refresh)

//router.get('/activate/:link', 
//    param('link').isUUID(),
//    ClientController.activate)

router.get('/validate',ClientController.validate)

module.exports = router