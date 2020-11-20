const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/imageUpload');

const routes = express.Router();
const upload = multer(uploadConfig);
const colorPickerController = require('./controllers/colorPickerController.js');

routes.post(
    '/colors',
    upload.single('image'),
    colorPickerController.generateImageColors
);

module.exports = routes;
