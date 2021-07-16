const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path:'./config.env'});

const defSchema = new mongoose.Schema({
    regno: {
        type:String,
        required:true,
        trim:true
    },
    messBill: {
        type:Number,
        required:true,
        trim:true
    },
    universityFees: {
        type:Number,
        required:true,
        trim:true
    }
})


const Defaulter = mongoose.model('DEFAULTER',defSchema);

module.exports = Defaulter;