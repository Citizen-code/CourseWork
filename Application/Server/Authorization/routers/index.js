const Router = require("express").Router
const ClientController = require('../controllers/client-controller')
const authMiddleWare = require('../middlewares/auth-middleware')
let router = Router()
let {body} = require('express-validator')

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({max:32,min:3}),//Дописать валидацию фио
    body('birth_date').isDate(),
    ClientController.registration)
router.post('/login',ClientController.login)
router.post('/logout',ClientController.logout)
router.get('/refresh',ClientController.refresh)
router.get('/activate/:link',ClientController.activate)

router.get('/client',authMiddleWare,ClientController.getClient)//Удалить

module.exports = router