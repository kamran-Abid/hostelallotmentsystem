const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path:'./config.env'});

const roomSchema = new mongoose.Schema({
    spr: {
        type:Number,
        required:true,
        trim:true
    },
    roomno: {
        type:Number,
        required:true,
        trim:true
    },
    gpa: {
        type:Number,
        required:true,
        trim:true
    },
    available: {
        type:Boolean,
        required:true,
        Default:true
    },
    hallname: {
        type:String,
        required:true,
        trim:true
    },
    year: {
        type:Number,
        required:true,
        trim:true
    },
    regnos:[
        { 
            regno: {
                type:String,
                trim:true
            }
        }
    ]
})

// Adding regno to rooms
roomSchema.methods.addRegno = async function(regno, available){
    try{
        this.regnos = this.regnos.concat({regno});
        this.available = this.available;
        await this.save();
        return this.policies;
    } catch(err){
        console.log(`Error in adding policies`);
        console.log(err);
    }
}

const Room = mongoose.model('ROOM',roomSchema);
module.exports = Room;