const Router = require("express").Router;
const {body, param, query} = require('express-validator')
const ClientController = require('../controller/client-controller');
const OrderController = require('../controller/order-controller');
const ServiceController = require('../controller/service-controller');
const authMiddleWare = require('../middlewares/auth-middleware');
let router = Router();

//Клиент
router.get('/client',
    authMiddleWare(['employee']),
    query('include').default(false).isBoolean(),
    query('pagination').default(false).isBoolean(),
    query('page').default(1).isInt(),
    ClientController.get_clients);

router.get('/client/count',
    authMiddleWare(['employee']),
    ClientController.get_count_clients);

router.get('/client/:id',
    param('id').isUUID(),
    query('include').default(false).isBoolean(),
    authMiddleWare(['employee','client']),
    ClientController.get_client);
//Авто
router.get('/car/:id',
    param('id').isUUID(),
    query('include').default(false).isBoolean(),
    authMiddleWare(['employee','client']));

router.get('/car');

router.post('/car');

router.put('/car');

//Услуга
router.get('/service/:id', 
    param('id').isUUID(),
    query('all').default(false).isBoolean(),
    authMiddleWare(['employee','client']),
    ServiceController.get_service);

router.get('/service',
    query('all').default(false).isBoolean(),
    query('pagination').default(false).isBoolean(),
    query('page').default(1).isInt(),
    authMiddleWare(['employee','client']),
    ServiceController.get_services);

router.get('/service/count',
    authMiddleWare(['employee']),
    ServiceController.get_count_services);

router.post('/service',
    body('name').isString().isLength({max:50}),
    body('price').isDecimal({max:100000,min:0}),
    body('is_hourly').isBoolean(),
    authMiddleWare(['employee']),
    ServiceController.add_service);

router.delete('/service/:id', 
    param('id').isUUID(),
    authMiddleWare(['employee']),
    ServiceController.delete_service);

router.put('/service/:id',
    param('id').isUUID());

//Заказ
router.get('/order/:id', 
    param('id').isUUID(),
    query('include').default(false).isBoolean(),
    authMiddleWare(['employee','client']),
    OrderController.get_order);

router.get('/order',
    query('include').default(false).isBoolean(),
    query('pagination').default(false).isBoolean(),
    query('page').default(1).isInt(),
    authMiddleWare(['employee','client']),
    OrderController.get_orders);

router.get('/order/count',
    authMiddleWare(['employee']),
    OrderController.get_count_orders);

router.get('/order/calendar/:year/:month',
    param('year').isInt({max:2100,min:0}),
    param('month').isInt({max:12,min:1}),
    query('include').default(false).isBoolean(),
    authMiddleWare(['employee']),
    OrderController.get_orders_in_month);

router.post('/order',
    body('employee_id').isUUID(),
    body('date').isDate(),
    authMiddleWare(['client']),
    OrderController.add_order);

router.delete('/order/:id', 
    param('id').isUUID(),
    authMiddleWare(['employee','client']),
    OrderController.delete_order);


module.exports = router;