const Router = require("express").Router;
const {body, param, query} = require('express-validator')
const OrderController = require('../controller/order-controller');
const authMiddleWare = require('../middlewares/auth-middleware');
let router = Router();

router.get('/',
    query('include').default(false).isBoolean(),
    query('pagination').default(false).isBoolean(),
    query('page').default(1).isInt(),
    authMiddleWare(['employee','client']),
    OrderController.get_orders);

router.get('/client',
    query('include').default(false).isBoolean(),
    query('pagination').default(false).isBoolean(),
    query('page').default(1).isInt(),
    authMiddleWare(['client']),
    OrderController.get_orders_client);

router.get('/client/:id', 
    param('id').isUUID(),
    query('include').default(false).isBoolean(),
    authMiddleWare(['client']),
    OrderController.get_order_client);

router.get('/:id', 
    param('id').isUUID(),
    query('include').default(false).isBoolean(),
    authMiddleWare(['employee','client']),
    OrderController.get_order);

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
    body('comment').optional().isLength({max:500}),
    body('date').isDate(),
    body('time').isTime(),
    authMiddleWare(['client']),
    OrderController.add_order);

router.post('/:id',
    param('id').isUUID(),
    body('list_services').isArray({min:1}),
    body('list_services.*.service_id').isUUID(),
    body('list_services.*.price_id').isUUID(),
    body('list_services.*.time').isDecimal(),
    body('list_consumable_parts').optional().isArray(),
    body('list_consumable_parts.*.consumable_part_id').isUUID(),
    authMiddleWare(['employee']),
    OrderController.add_content_order);

router.delete('/:id', 
    param('id').isUUID(),
    authMiddleWare(['employee','client']),
    OrderController.delete_order);


module.exports = router