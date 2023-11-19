
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
    ClientController.get_clients);

router.get('/count',
    authMiddleWare(['employee']),
    ClientController.get_count_clients);

router.get('/:id',
    param('id').isUUID(),
    query('include').default(false).isBoolean(),
    authMiddleWare(['employee','client']),
    ClientController.get_client);

router.put('/:id',
    body('surname').optional().isString().isLength({max:20}),
    body('firstname').optional().isString().isLength({max:20}),
    body('lastname').optional().isString().isLength({max:20}),
    body('birth_date').optional().isDate(),
    body('email').optional().isEmail().isLength({max:30}),
    body('phone').optional().isString().isLength({max:20}),
    authMiddleWare(['employee','client']),
    ClientController.edit_client);

module.exports = router