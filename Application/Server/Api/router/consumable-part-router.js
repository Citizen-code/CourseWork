const Router = require("express").Router;
const {body, param, query} = require('express-validator')
const ConsumablePartController = require('../controller/consumable-part-controller');
const authMiddleWare = require('../middlewares/auth-middleware');
let router = Router();

router.get('/count',
    authMiddleWare(['employee']),
    ConsumablePartController.get_count_consumable_parts);

router.get('/:id', 
    param('id').isUUID(),
    query('include').default(false).isBoolean(),
    authMiddleWare(['employee']),
    ConsumablePartController.get_consumable_part);

router.get('/',
    query('pagination').default(false).isBoolean(),
    query('page').default(1).isInt(),
    query('include').default(false).isBoolean(),
    authMiddleWare(['employee']),
    ConsumablePartController.get_consumable_parts);

router.post('/',
    body('brand').optional().isString({max:50}),
    body('article').optional().isString({max:50}),
    body('name').optional().isString({max:150}),
    body('price').optional().isDecimal({max:100000,min:0}),
    body('measure_unit').optional().isString({max:10}),
    body('photo_id').optional().isUUID(),    
    authMiddleWare(['employee']),
    ConsumablePartController.add_consumable_part);

router.put('/:id',
    param('id').isUUID(),
    body('brand').optional().isString({max:50}),
    body('article').optional().isString({max:50}),
    body('name').optional().isString({max:150}),
    body('price').optional().isDecimal({max:100000,min:0}),
    body('measure_unit').optional().isString({max:10}),
    body('photo_id').optional().isUUID(),    
    authMiddleWare(['employee']),
    ConsumablePartController.update_consumable_part);


module.exports = router