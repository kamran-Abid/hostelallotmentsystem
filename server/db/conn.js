const mongoose = require("mongoose"); /* 5.11.13 */
const dotenv = require("dotenv");
//const dd = "mongodb+srv://zkabid:zafeer911@cluster0.o8swh.mongodb.net/mernstack?authSource=admin&compressors=zlib&retryWrites=true&w=majority&ssl=true";
//const uri = "mongodb+srv://zkabid:zafeer911@cluster0.o8swh.mongodb.net/mernstack?retryWrites=true&w=majority";

dotenv.config({path:'./config.env'});
//const DB = process.env.DATABASE;
const LDB = process.env.LDB;

mongoose.connect(LDB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("Connection successful");
}).catch((e)=>{
    console.log(`no connection got error ${e}`);
});

