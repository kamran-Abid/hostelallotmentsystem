const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');


//app.use(cookieParser());

// const router = require("../router/auth");
// const cookieParser = require('cookie-parser');
dotenv.config({path:'./config.env'});

const Authenticate = async (req, res, next) => {
    try{
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token});

        if(!rootUser){throw new Error('User not found');};

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch(e){
        console.log(`This is the awesome vcookie ${req.cookies.jwtoken}`); 
        res.status(401).send("Unauthorize: No token provided");
        console.log(e);
    }
}

module.exports = Authenticate