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
    query('page').default(1).isInt({min:1}),
    authMiddleWare(['employee','client']),
    CarController.get_cars);

router.post('/',
    body('number').isString().isLength({max:8, min:8}).withMessage('Номер авто должен содержать в себе 8 символов'),
    body('name').isString().isLength({max:200, min:1}).withMessage('Наименование авто должно быть не больше 200 символов'),
    body('release_year').optional().isInt({max:2024,min:1900}).withMessage('Год выпуска авто должен быть числом и в диапазоне от 1900 до 2024'),
    body('mileage').optional().isString().isLength({max:10, min:1}).withMessage('Пробег не должен быть больше 10 символов'),
    body('vin').optional().isString().isLength({max:17, min:17}).withMessage('VIN Номер авто должен содержать в себе 17 символов'),
    body('color').optional().isString().isLength({max:50, min:1}).withMessage('Цвет не должен быть больше 50 символов'),
    body('engine_id').optional().isInt(),
    body('photo_id').optional().isUUID(),
    authMiddleWare(['client']),
    CarController.add_car);

router.put('/:id',
    param('id').isUUID(),
    body('number').optional().isString().isLength({max:8, min:8}).withMessage('Номер авто должен содержать в себе 8 символов'),
    body('name').optional().isString().isLength({max:200, min:1}).withMessage('Наименование авто должно быть не больше 200 символов'),
    body('release_year').optional().isInt({max:2024,min:1900}).withMessage('Год выпуска авто должен быть в диапазоне от 1900 до 2024'),
    body('mileage').optional().isNumeric({max:9999999999}).withMessage('Пробег не должен быть больше 10 символов'),
    body('vin').optional().isString().isLength({max:17, min:17}).withMessage('VIN Номер авто должен содержать в себе 17 символов'),
    body('color').optional().isString().isLength({max:50, min:1}).withMessage('Цвет не должен быть больше 50 символов'),
    body('engine_id').optional().isInt(),
    body('photo_id').optional().isUUID(),
    authMiddleWare(['employee','client']),
    CarController.update_car);

module.exports = router