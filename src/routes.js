const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/imageUpload');

const routes = express.Router();
const upload = multer(uploadConfig);
const colorPickerController = require('./controllers/colorPickerController.js');

routes.post(
    '/image',
    upload.single('image'),
    colorPickerController.generateImageColors
);
routes.get('/colors', colorPickerController.getColors);

module.exports = routes;
