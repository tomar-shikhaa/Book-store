const Slider = require('../model/SliderModel');

// Controller for uploading slider image
const uploadSliderImage = async (req, res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ success: false, error: res.__('multer.noFile') });
        }

        // Save the image path to the database
        const slider = new Slider({
            img: req.file.path    
        });
        await slider.save();

        res.status(201).json({ success: true, data: slider, message: res.__('multer.success') });
    } catch (err) {
        res.status(500).json({ success: false, error: err.__('multer.serverError') });
    }
};

module.exports = {uploadSliderImage};



