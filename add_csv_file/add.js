const fs = require('fs');
const { config } = require('process');
const mysql = require('mysql2');
const CsvToJson = require('../modules/CsvToJson.js')


let con = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"root",
    database:"saas"
});

con.connect( function(err){
    if (err) throw err;
    console.log("DB Connected");
});


async function make_query(query, callback) {
    var connection = con;
    console.log(query);
    return await connection.query(query, (err, results) => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
}

// async function get_columns(database) {
//     let sql = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${database}'`;
//     return await make_query(sql);
    
// }


module.exports.upload_csv = async (req, res) => {
    let csvData = [];
    if(req.params.filename && req.params.foldername ){
        let file = req.params.filename;
        let folder = req.params.foldername;
        let filePath = `./data/${folder}/${file}`;

        csv_original = fs.readFileSync(filePath, 'utf8');
        let csv_json = CsvToJson(csv_original, '\t'); 

        console.log(csv_json);
        

        res.send("ok")
       
        

    }
    else{
        //send res error need parameters
        res.send("error with parameters");
    }
    
}