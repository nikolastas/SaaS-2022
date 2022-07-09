const mysql = require("mysql2");

let con = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"root",
    database:"saas"
});


module.exports = con;