const Router = require("express").Router
const UserController = require('../controllers/user-controller')
let router = Router()
let {body} = require('express-validator')

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({max:32,min:3}),
    UserController.registration)
router.post('/login',UserController.login)
router.post('/logout',UserController.logout)
router.get('/refresh',UserController.refresh)
router.get('/activate/:link',UserController.activate)

router.get('/users',UserController.getUsers)

module.exports = router