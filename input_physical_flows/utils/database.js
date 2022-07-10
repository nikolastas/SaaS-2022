const mysql = require("mysql2");

let con = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"root",
    database:"input_ff"
});


module.exports = con;