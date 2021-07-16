
const express = require("express");
const app = express();
const results = require('./Defaulter Lists/defaulter')
const dotenv = require("dotenv");
require("./db/conn");
require("./Defaulter Lists/defaulter");
// const User = require("./models/userSchema");
const cookieParser = require('cookie-parser');

app.use(express.json());

// We made a router file to make our route easy
app.use(require('./router/auth'));
app.use(cookieParser());

dotenv.config({path:'./config.env'});

const port = process.env.PORT || 8000;

app.get("/",(req,res)=>{
    res.send("Welcome to home page");
})
app.get("/signup",(req,res)=>{
    res.send("Welcome to registratioin page");
})
// app.get("/register",(req,res)=>{
//     res.send("Welcome to register page");
// })
app.get("/signin",(req,res)=>{
    res.send("Welcome to login page");
})


app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})