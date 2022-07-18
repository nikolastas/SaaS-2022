const con = require("../utils/database.js");
const mysql = require("mysql2");
const dot = require("dotenv");
const path = require('path');
const fs = require('fs');
dot.config();


// input_ff -> areas physicalflows
// input_agrt -> areas agggregationpertype
// input_atl -> areas actualtotalload

async function ResetDB(jsonHost) {
    
    const con = mysql.createConnection({
        host: jsonHost['host'],
        user: jsonHost['user'],
        password: jsonHost['password'],
        database: jsonHost['database']
    });

    return new Promise (function (resolve, reject){ 
        
            
            sql_query = 'TRUNCATE TABLE ' + jsonHost['tablename']; 
            con.query(sql_query, function (err, result, fields) {
              if (err) reject({err:err, success:false});
                con.end();
                
                resolve({success: true});
            });
          
        })
    

    

};
module.exports = {ResetDB};