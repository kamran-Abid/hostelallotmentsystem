const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config({path:'./config.env'});

const userSchema = new mongoose.Schema({
    regno: {
        type:String,
        required:true,
        unique:true,
        uppercase:true,
        trim:true
    },
    name: {
        type:String,
        required:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    phone: {
        type:Number,
        required:true,
        trim:true
    },
    gpa: {
        type:Number,
        required:true,
        trim:true
    },
    password: {
        type:String,
        required:true,
        trim:true
    },
    cpassword: {
        type:String,
        required:true,
        trim:true
    },
    year: {
        type:Number,
        required:true,
    },
    date: {
        type:Date,
        default:Date.now
    },
    messages:[
        { 
            message: {
                type:String,
                require:true
            }
        }
    ],
    tokens: [
        {
            token: {
                type:String,
                required:true
            }
        }
    ]
})

// Hashing the password
userSchema.pre('save', async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})

// We are generate token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id: this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch(e){
        console.log(e);
    }
}

// Adding message of contact us form
userSchema.methods.addMessage = async function(message){
    try{
        this.messages = this.messages.concat({message});
        await this.save();
        return this.messages;
    } catch(err){
        console.log(err);
    }
}

const User = mongoose.model('USER',userSchema);

module.exports = User;