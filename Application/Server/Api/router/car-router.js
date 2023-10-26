const Router = require("express").Router;
const {body, param, query} = require('express-validator')
const CarController = require('../controller/car-controller');
const authMiddleWare = require('../middlewares/auth-middleware');

let router = Router();

router.get('/count',
    authMiddleWare(['employee']),
    CarController.get_count_cars);

router.get('/:id',
    param('id').isUUID(),
    query('include').default(false).isBoolean(),
    authMiddleWare(['employee','client']),
    CarController.get_car);

router.get('/',
    query('include').default(false).isBoolean(),
    query('pagination').default(false).isBoolean(),
    query('page').default(1).isInt(),
    authMiddleWare(['employee','client']),
    CarController.get_cars);

router.post('/',
    body('number').isString().isLength({max:8, min:8}),
    body('name').isString().isLength({max:200, min:1}),
    body('release_year').optional().isInt({max:2100,min:1900}),
    body('mileage').optional().isString().isLength({max:10, min:1}),
    body('vin').optional().isString().isLength({max:17, min:17}),
    body('color').optional().isString().isLength({max:50, min:1}),
    body('engine_id').optional().isInt(),
    body('photo_id').optional().isUUID(),
    query('include').default(false).isBoolean(),
    authMiddleWare(['client']),
    CarController.add_car);

router.put('/:id',
    param('id').isUUID(),
    body('number').isString().isLength({max:8, min:8}),
    body('name').isString().isLength({max:200, min:1}),
    body('release_year').optional().isInt({max:2100,min:1900}),
    body('mileage').optional().isString().isLength({max:10, min:1}),
    body('vin').optional().isString().isLength({max:17, min:17}),
    body('color').optional().isString().isLength({max:50, min:1}),
    body('engine_id').optional().isInt(),
    body('photo_id').optional().isUUID(),
    authMiddleWare(['employee','client']),
    CarController.update_car);

module.exports = router