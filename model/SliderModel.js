const mongoose = require("mongoose")

const SliderSchema = new mongoose.Schema({
    img:{
        type:String,
        require:true,
    }
})
const Slider = mongoose.model('slider', SliderSchema);

module.exports = Slider;