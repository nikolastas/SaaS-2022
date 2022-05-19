const cred = require('../db_config.json');
const mysql = require("mysql");
const con = mysql.createConnection(cred.dbconf);

module.exports = function AddUser (username,email){
    let TimeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let sql_query = `INSERT INTO subscriptions VALUES ('${username}','${email}','${TimeNow}','${TimeNow}','') `;

    con.query(sql_query,(err)=>{
        if (err) throw err;
        console.log("User Created Successfully");
    })
}