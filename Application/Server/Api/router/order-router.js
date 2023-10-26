const Router = require("express").Router;
const {body, param, query} = require('express-validator')
const OrderController = require('../controller/order-controller');
const authMiddleWare = require('../middlewares/auth-middleware');
let router = Router();

router.get('/:id', 
    param('id').isUUID(),
    query('include').default(false).isBoolean(),
    authMiddleWare(['employee','client']),
    OrderController.get_order);

router.get('/',
    query('include').default(false).isBoolean(),
    query('pagination').default(false).isBoolean(),
    query('page').default(1).isInt(),
    authMiddleWare(['employee','client']),
    OrderController.get_orders);

router.get('/count',
    authMiddleWare(['employee']),
    OrderController.get_count_orders);

router.get('/calendar/:year/:month',
    param('year').isInt({max:2100,min:0}),
    param('month').isInt({max:12,min:1}),
    query('include').default(false).isBoolean(),
    authMiddleWare(['employee']),
    OrderController.get_orders_in_month);

router.post('/',
    body('employee_id').isUUID(),
    body('date').isDate(),
    authMiddleWare(['client']),
    OrderController.add_order);

router.delete('/:id', 
    param('id').isUUID(),
    authMiddleWare(['employee','client']),
    OrderController.delete_order);


module.exports = router