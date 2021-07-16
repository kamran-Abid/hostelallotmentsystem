const jwt = require("jsonwebtoken");
const Employee = require("../models/empSchema");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

dotenv.config({path:'./config.env'});

const Authenticate = async (req, res, next) => {
    try{
        const token = req.cookies.jwte; 
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await Employee.findOne({_id: verifyToken._id, "tokens.token": token});

        if(!rootUser){throw new Error('Employee not found');};

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch(e){
        console.log(`This is the awesome vcookie ${req.cookies.jwte}`); 
        res.status(401).send("Unauthorize: No token provided");
        console.log(e);
    }
}

module.exports = Authenticate