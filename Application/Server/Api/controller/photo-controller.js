//const {findAll} = require('../services/engine-service');
const validateService = require('../services/validate-service')
const { v4 } = require('uuid')
const ApiError = require("../exception/error");

class PhotoController{
    async upload_photo(req,res,next){
        try{
            validateService.validate(req)
            if (!req.files) {
                throw ApiError.BadRequest('Файлы не были загружены')
            }
            if (!req.files.photo) {
                throw ApiError.BadRequest('Файлы не были загружены')
            }
            const file = req.files.photo;
            const path_file =  `${__dirname}/../../../../${v4()}.${file.name.split('.')[1]}`;
            file.mv(path_file, (err) => {
                if (err) {
                    return res.status(500).json({message:'Ошибка при сохранении'});
                }
                return res.json({message:'Успешно'});
            });
        }catch(e){
           next(e)
        }
    }
}
module.exports = new PhotoController()