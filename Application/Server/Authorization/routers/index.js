const Router = require("express").Router
const {body, param, cookie} = require('express-validator')
const ClientController = require('../controllers/client-controller')
const EmployeeController = require('../controllers/employee-controller')
const ValidateController = require('../controllers/validate-controller')
let router = Router()

router.post('/registration',
    body('email').isEmail().withMessage('Неверный формат email').isLength({max:30}).withMessage('Email должен не превышать 30 символов'),
    body('password').isString().isLength({max:32,min:3}).withMessage('Пароль должен быть от 3 до 32 символов'),
    body('birth_date').isDate().withMessage('Неверный формат даты'),
    body('surname').isString().isLength({max:20}).withMessage('Фамилия должна не превышать 30 символов'),
    body('firstname').isString().isLength({max:20}).withMessage('Имя должно не превышать 30 символов'),
    body('lastname').optional().isString().isLength({max:20}).withMessage('Отчество должно не превышать 30 символов'),
    body('phone').optional().matches('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$').withMessage('Неверный формат телефона').isLength({max:20}).withMessage('Телефон должен не превышать 30 символов'),
    ClientController.registration)

router.post('/login/client',
    body('email').isEmail().withMessage('Неверный формат email'),
    body('password').isString().isLength({max:32}).withMessage('Пароль должен не превышать 32 символов'),
    ClientController.login)

router.post('/login/employee',
    body('login').isString().isLength({max:40}).withMessage('Логин должен не превышать 40 символов'),
    body('password').isString().isLength({max:40}).withMessage('Пароль должен не превышать 40 символов'),
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