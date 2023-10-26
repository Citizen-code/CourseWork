
const Router = require("express").Router;
const {param, query} = require('express-validator')
const ClientController = require('../controller/client-controller');
const authMiddleWare = require('../middlewares/auth-middleware');

let router = Router();

router.get('/',
    authMiddleWare(['employee']),
    query('include').default(false).isBoolean(),
    query('pagination').default(false).isBoolean(),
    query('page').default(1).isInt(),
    ClientController.get_clients);

router.get('/count',
    authMiddleWare(['employee']),
    ClientController.get_count_clients);

router.get('/:id',
    param('id').isUUID(),
    query('include').default(false).isBoolean(),
    authMiddleWare(['employee','client']),
    ClientController.get_client);

module.exports = router