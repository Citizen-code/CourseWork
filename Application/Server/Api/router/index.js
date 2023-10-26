const Router = require("express").Router;
const car = require('./car-router');
const client = require('./client-router');
const consumable_part = require('./consumable-part-router');
const employee = require('./employee-router');
const order = require('./order-router');
const service = require('./service-router');

let router = Router();

router.use('/car',car)
router.use('/client',client)
router.use('/consumable-part',consumable_part)
router.use('/employee',employee)
router.use('/order',order)
router.use('/service',service)

module.exports = router;