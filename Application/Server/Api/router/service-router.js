const Router = require("express").Router;
const {body, param, query} = require('express-validator')
const ServiceController = require('../controller/service-controller');
const authMiddleWare = require('../middlewares/auth-middleware');
let router = Router();

router.get('/count',
    query('all').default(false).isBoolean(),
    authMiddleWare(['employee']),
    ServiceController.get_count_services);

router.get('/:id', 
    param('id').isUUID(),
    query('all').default(false).isBoolean(),
    query('include').default(false).isBoolean(),
    authMiddleWare(['employee','client']),
    ServiceController.get_service);

router.get('/',
    query('all').default(false).isBoolean(),
    query('pagination').default(false).isBoolean(),
    query('page').default(1).isInt({min:1}),
    query('include').default(false).isBoolean(),
    query('text').optional().isString(),
    query('order').optional().isIn(['ASC','DESC']).withMessage('В сортировке указывается только одно из значений (ASC,DESC)'),
    authMiddleWare(['employee','client']),
    ServiceController.get_services);

router.post('/',
    body('name').isString().isLength({max:50}).withMessage('Наименование должно быть не больше 50'),
    body('price').isDecimal({max:100000,min:0}).withMessage('Цена должна быть числом с точкой не должен превышать 100000 символов'),
    body('is_time_based').isBoolean(),
    authMiddleWare(['employee']),
    ServiceController.add_service);

router.delete('/:id', 
    param('id').isUUID(),
    authMiddleWare(['employee']),
    ServiceController.delete_service);

router.put('/:id',
    param('id').isUUID(),
    body('name').optional().isString().isLength({max:50}).withMessage('Наименование должно быть не больше 50'),
    body('price').optional().isDecimal({max:100000,min:0}).withMessage('Цена должна быть числом с точкой не должен превышать 100000 символов'),
    body('is_time_based').optional().isBoolean(),
    authMiddleWare(['employee']),
    ServiceController.update_service);

module.exports = router