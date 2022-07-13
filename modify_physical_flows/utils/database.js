const mysql = require("mysql2");

let con = mysql.createConnection({
    // host: "localhost",
    // user:"root",
    // password:"root",
    // database:"modify_ff"
    host: "35.204.254.162",//needs to be changed to unix sock
    user: "root",
    password: "root",
    database: "modify_ff"
});


module.exports = con;