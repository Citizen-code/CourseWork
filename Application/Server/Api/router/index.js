const Router = require("express").Router;
const {body, param, query} = require('express-validator')
const ClientController = require('../controller/client-controller');
const OrderController = require('../controller/order-controller');
const ServiceController = require('../controller/service-controller');
const CarController = require('../controller/car-controller');
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
router.get('/car/count',
    authMiddleWare(['employee']),
    CarController.get_count_cars);

router.get('/car/:id',
    param('id').isUUID(),
    query('include').default(false).isBoolean(),
    authMiddleWare(['employee','client']),
    CarController.get_car);

router.get('/car',
    query('include').default(false).isBoolean(),
    query('pagination').default(false).isBoolean(),
    query('page').default(1).isInt(),
    authMiddleWare(['employee','client']),
    CarController.get_cars);

router.post('/car',
    body('number').isString().isLength({max:8, min:8}),
    body('name').isString().isLength({max:200, min:1}),
    body('release_year').default(undefined).optional().isInt({max:2100,min:1900}),
    body('mileage').default(undefined).optional().isString().isLength({max:10, min:1}),
    body('vin').default(undefined).optional().isString().isLength({max:17, min:17}),
    body('color').default(undefined).optional().isString().isLength({max:50, min:1}),
    body('engine_id').default(undefined).optional().isInt(),
    body('photo_id').default(undefined).optional().isUUID(),
    query('include').default(false).isBoolean(),
    authMiddleWare(['client']),
    CarController.add_car);

router.put('/car/:id',
    param('id').isUUID(),
    body('number').isString().isLength({max:8, min:8}),
    body('name').isString().isLength({max:200, min:1}),
    body('release_year').default(undefined).optional().isInt({max:2100,min:1900}),
    body('mileage').default(undefined).optional().isString().isLength({max:10, min:1}),
    body('vin').default(undefined).optional().isString().isLength({max:17, min:17}),
    body('color').default(undefined).optional().isString().isLength({max:50, min:1}),
    body('engine_id').default(undefined).optional().isInt(),
    body('photo_id').default(undefined).optional().isUUID(),
    authMiddleWare(['employee','client']),
    CarController.update_car);

//Сотрудник
router.get('/employee/:id',
    param('id').isUUID(),
    query('include').default(false).isBoolean(),
    authMiddleWare(['employee','client']));

router.get('/employee',
    query('include').default(false).isBoolean(),
    authMiddleWare(['employee','client']));

//Услуга
router.get('/service/count',
    authMiddleWare(['employee']),
    ServiceController.get_count_services);

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