const Router = require("express").Router;
const PhotoController = require('../controller/photo-controller');
const authMiddleWare = require('../middlewares/auth-middleware');
let router = Router();

router.post('/',
    //authMiddleWare(['employee','client']),
    PhotoController.upload_photo);

module.exports = router