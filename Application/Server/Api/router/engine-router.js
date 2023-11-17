const Router = require("express").Router;
const EngineController = require('../controller/engine-controller');
const authMiddleWare = require('../middlewares/auth-middleware');
let router = Router();

router.get('/',
    authMiddleWare(['employee','client']),
    EngineController.get_engines);

module.exports = router