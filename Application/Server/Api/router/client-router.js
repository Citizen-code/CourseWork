
const Router = require("express").Router;
const {param, query, body} = require('express-validator')
const ClientController = require('../controller/client-controller');
const authMiddleWare = require('../middlewares/auth-middleware');

let router = Router();

router.get('/',
    authMiddleWare(['employee']),
    query('include').default(false).isBoolean(),
    query('pagination').default(false).isBoolean(),
    query('page').default(1).isInt({min:1}),
    query('text').optional().isString(),
    query('order').optional().isIn(['ASC','DESC']).withMessage('В сортировке указывается только одно из значений (ASC,DESC)'),
    ClientController.get_clients);

router.get('/count',
    query('text').optional().isString(),
    authMiddleWare(['employee']),
    ClientController.get_count_clients);

router.get('/:id',
    param('id').isUUID(),
    query('include').default(false).isBoolean(),
    authMiddleWare(['employee','client']),
    ClientController.get_client);

router.put('/:id',
    body('surname').optional().isString().isLength({max:20}).withMessage('Фамилия не должна превышать 20 символов'),
    body('firstname').optional().isString().isLength({max:20}).withMessage('Имя не должна превышать 20 символов'),
    body('lastname').optional().isString().isLength({max:20}).withMessage('Отчество не должна превышать 20 символов'),
    body('birth_date').optional().isDate().withMessage('Неверный формат даты рождения'),
    body('email').optional().isEmail().withMessage('Неверный формат email').isLength({max:30}).withMessage('Email не должна превышать 20 символов'),
    body('phone').optional().isString().withMessage('Неверный формат номера телефона').isLength({max:20}).withMessage('Телефон не должна превышать 20 символов'),
    authMiddleWare(['employee','client']),
    ClientController.edit_client);

module.exports = router