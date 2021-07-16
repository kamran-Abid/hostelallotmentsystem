const csvtojson = require('csvtojson');
const fs = require('fs');
const csvfilepath = "Defaulter Lists/data.csv";


var jsoncsv = ""
csvtojson()
    .fromFile(csvfilepath)
    .then((jsoncsv) => {
        // console.log(jsoncsv);
        // fs.writeFileSync("output.json", JSON.stringify(jsoncsv), 'utf-8', (err) => {
        //     if(err) console.log(`Error in outputtng json : \n \t ${err}`);
        // })
    })
// chk = false;

module.exports = jsoncsv;