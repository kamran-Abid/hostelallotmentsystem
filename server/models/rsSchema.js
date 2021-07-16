const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path:'./config.env'});

const psSchema = new mongoose.Schema({
    hallname: {
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    policies: [
        {
            lrr: {
                type:Number,
                required:true,
                trim:true
            },
            urr: {
                type:Number,
                required:true,
                trim:true
            },
            gpa: {
                type:Number,
                required:true,
                trim:true
            },
            spr: {
                type:Number,
                required:true,
                trim:true
            },
            yr: {
                type:Number,
                required:true,
                trim:true
            }
        }
    ],
    date: {
        type:Date,
        default:Date.now
    }
})

// Adding policy of contact us form
psSchema.methods.addPolicy = async function(lrr, urr, gpa, spr, yr){
    try{
        this.policies = this.policies.concat({lrr, urr, gpa, spr, yr});
        await this.save();
        return this.policies;
    } catch(err){
        console.log(`Error in adding policies`);
        console.log(err);
    }
}


const Rs = mongoose.model('POLICY',psSchema);

module.exports = Rs;