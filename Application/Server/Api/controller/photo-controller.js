//const {findAll} = require('../services/engine-service');
const validateService = require('../services/validate-service')
const { v4 } = require('uuid')
const ApiError = require("../exception/error");
const {photo} = require('../models/init-models')


class PhotoController{
    async upload_photo(req,res,next){
        try{
            validateService.validate(req)
            if (!req.files) throw ApiError.BadRequest('Файлы не были загружены');
            if (!req.files.photo) throw ApiError.BadRequest('Файлы не были загружены');

            const file = req.files.photo;
            const id = v4();
            const extension = `.${file.name.split('.')[1]}`;
            const path_file =  `${__dirname}${process.env.FOLDER_PATH}${id}${extension}`;
            const data = await photo.create({id,extension})

            file.mv(path_file,async (err) => {
                if (err){
                    await data.destroy();
                    return res.status(500).json({message:'Ошибка при сохранении'});
                }
                return res.json(data);
            });
        }catch(e){
           next(e)
        }
    }
}
module.exports = new PhotoController()