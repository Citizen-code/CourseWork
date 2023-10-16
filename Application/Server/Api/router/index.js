const Router = require("express").Router;
const ClientController = require('../controller/client-controller');
const OrderController = require('../controller/order-controller');
const ServiceController = require('../controller/service-controller');
let router = Router();

router.get('/client/:id',ClientController.get_client);
router.get('/client',ClientController.get_clients);

router.get('/car/:id');
router.get('/car');
router.post('/car');
router.put('/car');

router.get('/service/:id',ServiceController.get_service);
router.get('/service',ServiceController.get_services);
router.post('/service');
router.delete('/service/:id',ServiceController.delete_service);
router.put('/service/:id');

router.get('/order/:id', OrderController.get_order);
router.get('/order', OrderController.get_orders);
router.get('/order/calendar/:year/:month',OrderController.get_orders_in_month);
router.post('/order');
router.delete('/order/:id',OrderController.delete_order);


module.exports = router;