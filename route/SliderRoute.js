const express = require('express');
const router = express.Router();
const { uploadSliderImage} = require('../controller/SliderController');
const upload = require("../utils/Multer")

// Route for uploading slider image
router.post('/upload', upload.single('img'), uploadSliderImage);

module.exports = router;
