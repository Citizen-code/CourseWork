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
    body('name').isString().isLength({max:50}),
    body('price').isDecimal({max:100000,min:0}),
    body('is_hourly').isBoolean(),
    authMiddleWare(['employee']),
    ConsumablePartController.add_consumable_part);

router.put('/:id',
    param('id').isUUID(),
    body('name').optional().isString().isLength({max:50}),
    body('price').optional().isDecimal({max:100000,min:0}),
    body('is_hourly').optional().isBoolean(),
    authMiddleWare(['employee']),
    ConsumablePartController.update_consumable_part);


module.exports = router