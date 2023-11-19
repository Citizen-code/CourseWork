const Router = require("express").Router;
const {param, query} = require('express-validator')
const EmployeeController = require('../controller/employee-controller');
const authMiddleWare = require('../middlewares/auth-middleware');
let router = Router();

router.get('/count',
    authMiddleWare(['employee','client']),
    EmployeeController.get_count_employees);

router.get('/:id',
    param('id').isUUID(),
    query('include').default(false).isBoolean(),
    authMiddleWare(['employee','client']),
    EmployeeController.get_employee);

router.get('/',
    query('include').default(false).isBoolean(),
    query('pagination').default(false).isBoolean(),
    query('page').default(1).isInt({min:0}),
    authMiddleWare(['employee','client']),
    EmployeeController.get_employees);

module.exports = router