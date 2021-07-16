const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate.js");
const authemp = require("../middleware/authemp");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const csv = require('csv-parser');
const csvtojson = require('csvtojson');
const fs = require('fs');
const csvfilepath = "Defaulter Lists/data.csv";


require("../db/conn");
const User = require("../models/userSchema");
const Employee = require("../models/empSchema");
const Rules = require("../models/rsSchema.js");
const Room = require("../models/roomSchema.js");
const Defaulter = require("../models/defaulterSchema");

router.use(cookieParser());

router.get("/", (req, res) => {
    res.send("Welcome to router page");
})



// Promises using async await 
router.post('/register', async (req, res) => {
    const { regno, name, email, phone, gpa, password, cpassword, year } = req.body;

    if (!regno || !name || !email || !phone || !gpa || !password || !cpassword || !year) {
        return res.status(420).json({ error: "Please fill whole fields" });
    }

    if(gpa > 4){
        return res.status(427).json({ error: "CGPA should not be greater than 4" });
    } else if(gpa < 0){
        return res.status(428).json({ error: "CGPA should not be less than 4" });
    }

    try {
        const userExistReg = await User.findOne({ regno: regno });
        const userExistEmail = await User.findOne({ email: email });
        if (userExistEmail) {
            return res.status(421).json({ error: "Email already exist" });
        } else if (userExistReg) {
            return res.status(422).json({ error: "Regno already exist" });

        } else if (password != cpassword) {
            return res.status(423).json({ error: "Password are not matching" });
        } else {
            const user = new User({ regno, name, email, phone, gpa, password, cpassword, year });
            // presave
            await user.save();
            res.status(201).json({ message: "User register successfully" });
        }
    } catch (err) {
        console.log(err);
    }
})

// Login route

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json("Please fill all fields");
        }

        const userLogin = await User.findOne({ email: email });
        //console.log(userLogin);
        if (userLogin) {
            //res.status(400).json({error: "invalid email"});
            const isMatch = await bcrypt.compare(password, userLogin.password);
            res.clearCookie('jwtoken');
            const token = await userLogin.generateAuthToken();
            console.log(token);
            res.clearCookie('jwte', { path: "/" });
            res.cookie("jwtoken"
                , token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })
            if (!isMatch) {
                res.status(400).json({ error: "invalid credentials" });
            } else {
                res.status(200).json({ message: "User signin successfully" });
            }
        } else {
            res.status(400).json({ error: "invalid credentials" });
        }

    } catch (err) {
        console.log(`You got error => \n ${err}`);
    }
})

// About us page
router.get("/about", authenticate, (req, res) => {
    console.log(`Welcome to about page ${req.cookies.jwtoken}`);
    res.send(req.rootUser);
})
// get data for contact us and home page 
router.get("/getdata", authenticate, (req, res) => {
    console.log(`Get user data for home and contact page. `);
    res.send(req.rootUser);
})

// Contact  us page 
router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            console.log("Error in contact us form")
            return res.json({ error: "Please fill alll fields of contact form" });
        }
        const userContact = await User.findOne({ _id: req.userID });
        if (userContact) {
            const userMsg = await userContact.addMessage(message);
            await userContact.save();

            res.status(201).json({ message: "User contact successfully" })
        }
    } catch (e) {
        console.log(e);
    }
})

// Logout page
router.get("/logout", authenticate, (req, res) => {
    console.log(`You are logining out`);
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send("User successfully logout");
})



// Signup of employee 

router.post('/registere', async (req, res) => {
    const { name, email, phone,sk ,  password, cpassword } = req.body;

    if (!name || !email || !phone || !sk || !password || !cpassword) {
        console.log(`${name} || ${email} || ${phone} || ${sk} || ${password} || ${cpassword}`);
        return res.status(420).json({ error: "Please fill whole fields" });
    }

    if(sk !== "secretkey"){
        return res.status(427).json({ error: "secret key is invalid" });
    } 

    try {
        const userExistEmail = await Employee.findOne({ email: email });
        if (userExistEmail) {
            return res.status(421).json({ error: "Email already exist" });
        } else if (password != cpassword) {
            return res.status(423).json({ error: "Password are not matching" });
        } else {
            const emp = new Employee({ name, email, phone, password, cpassword });
            // presave
            await emp.save();
            res.status(201).json({ message: "User register successfully" });
        }
    } catch (err) {
        console.log(err);
    }
})

// Login of employee

router.post("/signine", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json("Please fill all fields");
        }

        const userLogin = await Employee.findOne({ email: email });
        if (userLogin) {
            //res.status(400).json({error: "invalid email"});
            const isMatch = await bcrypt.compare(password, userLogin.password);
            res.clearCookie('jwtoken');
            const token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwte", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })
            if (!isMatch) {
                res.status(400).json({ error: "invalid credentials" });
            } else {
                res.status(200).json({ message: "User signin successfully" });
            }
        } else {
            res.status(400).json({ error: "invalid credentials" });
        }
    } catch (err) {
        console.log(`You got error => \n ${err}`);
    }
})
// About us page
router.get("/aboute", authemp, (req, res) => {
    console.log(`Welcome to about page ${req.cookies.jwtoken}`);
    res.send(req.rootUser);
})
// get data for contact us and home page 
router.get("/getdatae", authemp, (req, res) => {
    console.log(`Get user data for home and contact page. `);
    res.send(req.rootUser);
})

// Contact  us page 

router.post('/contacte', authemp, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            console.log("Error in contact us form")
            return res.json({ error: "Please fill alll fields of contact form" });
        }
        const userContact = await Employee.findOne({ _id: req.userID });
        if (userContact) {
            const userMsg = await userContact.addMessage(message);
            await userContact.save();

            res.status(201).json({ message: "User contact successfully" })
        }
    } catch (e) {
        console.log(e);
    }
})

// Logout page of employee

router.get("/logoute", authemp, (req, res) => {
    res.clearCookie('jwte', { path: '/' });
    res.status(200).send("User successfully logout employee");
})

// Defining rule for room in emp
router.post('/rule', async (req, res) => {
    var { hallname, lrr, urr, gpa, spr, yr} = req.body;

    if ( !lrr || !urr || !gpa || !spr || !yr || !hallname ) {
        console.log( `hallname: ${hallname} lrr: ${lrr} urr: ${urr} gpa: ${gpa} spr: ${spr} yr: ${yr}`);
        return res.status(420).json({ error: "Please fill whole fields" });
    }

    try {
        //await Room.deleteMany();
        const hallExist = await Rules.findOne({ hallname: hallname });     
        if(!hallExist){
            const pr = new Rules({hallname: hallname});
            await pr.save();
        }
        available = true;
        let year = yr;
        let roomno
        for (let i = lrr; i <= urr; i++) {
            const roomnoExist = await Room.findOne({ roomno : i, hallname: hallname });
            //console.log(`Hallname exist ${hallExist}`);
            console.log(`Room number exist ${roomnoExist}`);
            //console.log(`i:  ${i}`);

            if (hallExist && roomnoExist){
                // await Rules.deleteMany({ hallname: hallname });
                return res.status(423).json({ error: "Room policy already define" });
            } else {
                roomno = i;
                console.log(`Room no ${i} is alloted`);
                const room = new Room({ spr, roomno, gpa, available, hallname, year });
                await room.save();
            }
        }
        // const rule = new Rules({hallname, lrr, urr, gpa, spr, yr });
        // await rule.save();

        const roomPolicy = await Rules.findOne({ hallname: hallname });

        const addPo = await roomPolicy.addPolicy(lrr, urr, gpa, spr, yr);
            await roomPolicy.save();

        res.status(201).json({ message: "Rule is defiled" });
    } catch (err) {
        console.log(`Get error in rule policy`);
        console.log(err);
    }
})

// get rules data
// get data for contact us and home page of employee

router.get("/gethallname", async(req, res) => {
    console.log(`Getting hallnames`);
    try{
        const wholehall = await Rules.find();
        req.rootUser = wholehall;
        res.send(req.rootUser);
    }catch(e){
        console.log("Getting error in get hall name");
        console.log(e);
    }
})

// Deleting policies  || delete policies and rooms table 

router.get("/deleterule", async(req, res) => {
    try{
        await Rules.deleteMany();
        await Room.deleteMany();
        console.log(`Table deleted`);
        return res.status(211).json({ message: "Table deleted" });
    }catch(e){
        console.log("Getting error in deleting tables");
        console.log(e);
    }
})

// Function call by defaulter

// const createJson = () => {
//     console.log("Function is runned");
//     var jsoncsv = "";
//     csvtojson()
//         .fromFile(csvfilepath)
//         .then((jsoncsv) => {
//             var chk = true;
//             console.log(jsoncsv);
//             fs.writeFileSync("output.json", JSON.stringify(jsoncsv), 'utf-8', (err) => {
//                 if(err) console.log(`Error in outputtng json : \n \t ${err}`);
//             })
//         })
//     console.log(`Create json function is called`);
//     console.log(jsoncsv);
//     return jsoncsv ;
// }

// defaulter list upload

router.get("/defaulter", async(req, res) => {
    const jsoncsv = require('../output.json');
    try{
        var regno = "";
        var messBill = 0;
        var universityFees = 0;
        await Defaulter.deleteMany();
        for( index in jsoncsv){
            regno = jsoncsv[index].regno;
            messBill = jsoncsv[index].messBill;
            universityFees = jsoncsv[index].universityFees;
            //console.log(regno, billType, amount);
            const deflist = new Defaulter({ regno, messBill, universityFees });
            await deflist.save();
        }
        console.log(`Defaulter list updated`);
        return res.status(211).json({ message: "Defaulter list updated" });
    }catch(e){
        console.log(`Getting error in defaulter list saving: \n ${e}`)
    }
})
// console.log(jsoncsv[0].amount);

// Defaulter table data
router.get("/defaultertable", async(req, res) => {
    console.log(`Getting data for defaulter table`);
    try{
        const view_table = await Defaulter.find();
        req.rootUser = view_table;
        res.send(req.rootUser);
    }catch(e){
        console.log("Getting error in getting table");
        console.log(e);
    }
})

// Getting regno for room leader in room alootment

router.get("/getregno", authenticate, (req, res) => {
    console.log(`Get user reg no for room allotment page. req root user is ${req.rootUser.regno}`);
    res.send(req.rootUser);
})

// Check room availability

var hallnamea = "";
var roomnoa = 0;
var spra = 0

router.post('/checkroom', async(req, res) => {
    try{
        const { hallname, roomno } = req.body;


        if (!hallname || !roomno) {
            return res.status(400).json("Please fill all fields");
        }

        const checkRoomNo = await Room.findOne({ hallname: hallname });
        if (checkRoomNo) {
            const isMatch = await Room.findOne({roomno: roomno});

            if (!isMatch) {
                res.status(401).json({ error: "room is not available" });
            } else {
                if(isMatch.available){
                    console.log(`Room is available`);
                    hallnamea = isMatch.hallname;
                    roomnoa = isMatch.roomno;
                    res.status(200).json({ message: "Room is available" });
                } else {
                    console.log(`This room is allot to someone else`);
                    res.status(403).json({ message: `This room is allot to someone else` });
                }
            }
        } else {
            console.log(`Hallname error`);
            res.status(402).json({ error: "Hall error" });
        }
    }catch(e){
        console.log("Getting error in checking room availability");
        console.log(e);
    }
})

// leader gpa year and other

router.get("/getleader", authenticate, async(req, res) => {
    try{
        var aid = req.rootUser;
        console.log(`applicant_id: ${aid.regno}`);
        // res.send(req.rootUser);
        console.log(`hallnamea: ~~~ ${hallnamea}, roomnoa: ~~~ ${roomnoa}`);
        const checkRoomNo = await Room.findOne({ hallname: hallnamea });
        if(checkRoomNo){
            const isMatch = await Room.findOne({roomno: roomnoa});
            const isDefaulter = await Defaulter.find({});
            for(i in isDefaulter){
                if (isDefaulter[i].regno.toUpperCase() === aid.regno){
                    console.log(`oooooop : ${isDefaulter[i].regno} is matching`);
                    return res.status(413).json({ error: "You are in defaulter list " });
                }
            }

            console.log(`isMatch.gpa ~~~ ${isMatch.gpa}, aid.gpa: ${aid.gpa}, isMatch.year ~~~ ${isMatch.year}, aid.year: ${aid.year}`);

            if (!isMatch) {
                console.log(`aid.gpa: ${aid.gpa}\naid.year: ${aid.year}`);
                res.status(401).json({ error: "room is not available" });
            }else if(aid.gpa < isMatch.gpa){
                console.log("Your CGPA is less than required ");
                res.status(410).json({ error: "Your CGPA is less than required " });
            } else if(aid.year !== isMatch.year){
                console.log("This room is not for your session ");
                res.status(411).json({ error: "This room is not for your session"});
            } else if(aid.year === isMatch.year || aid.gpa > isMatch.gpa){
                console.log("successful you can get this room");
                // success
                const saveRegno = await Room.findOne({ hallname : isMatch.hallname, roomno: isMatch.roomno });
                //console.log(`saveRego; ${saveRegno}`);
                //aid.available = false;
                const addPo = await saveRegno.addRegno(aid.regno, aid.available);
                    await saveRegno.save();
                res.status(210).json({ message: "successful: you eligible for this room"});
            } else {
                console.log("No room ");
                res.status(412).json({ message: "Error: no room"});
            }
        }
    }catch(e){
        console.log("Getting error in checking room availability");
        console.log(e);
    }
})


// getting roommate
router.post('/checkroomate', async(req, res) => {
    try{
        const {roommate} = req.body ;
        const aidr = await User.findOne({regno: roommate});
        console.log(`aidr year : ${aidr.year}`);
        const checkRoomNo = await Room.findOne({ hallname: hallnamea });
        if(checkRoomNo){
            const isMatch = await Room.findOne({roomno: roomnoa});
            console.log(`roommate : ${roommate}`)
            const isDefaulter = await Defaulter.find({});
            console.log(`isDefaulter : ${isDefaulter[0].regno}`)
            for(i in isDefaulter[0].regno){
                if (isDefaulter[i].regno.toUpperCase() === roommate){
                    console.log(`oooooop : ${isDefaulter[i].roommate} is matching`);
                    return res.status(413).json({ error: "You are in defaulter list " });
                }
            }
            if (!isMatch) {
                res.status(401).json({ error: "room is not available" });
            } else if(aidr.year !== isMatch.year){
                console.log("This room is not for your session ");
                res.status(411).json({ error: "This room is not for your session"});
            } else if(aidr.year === isMatch.year ){
                console.log("successful you can get this room");
                // success
                const saveRegno = await Room.findOne({ hallname : isMatch.hallname, roomno: isMatch.roomno });
                const addPo = await saveRegno.addRegno(aidr.regno, aidr.available);
                    await saveRegno.save();
                res.status(210).json({ message: "successful: you eligible for this room"});
            } else {
                console.log("No room ");
                res.status(412).json({ message: "Error: no room"});
            }
        }
    }catch(e){
        console.log("Getting error in checking roommate entery");
        console.log(e);
    }
})

// View applcant table

router.get('/applicanttable', async(req, res) => {
    console.log(`Getting data for applicants table`);
    try{
        const view_table = await User.find();
        req.rootUser = view_table;
        res.send(req.rootUser);
    }catch(e){
        console.log("Getting error in getting table");
        console.log(e);
    }
})


module.exports = router;