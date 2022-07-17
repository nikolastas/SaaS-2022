const mysql = require("mysql2");
const dot  = require("dotenv");
dot.config();

let con = mysql.createConnection({
    // host: "localhost",
    // user:"root",
    // password:"root",
    // database:"modify_ff"
    host: process.env.DATABASE_HOST ,//needs to be changed to unix sock
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_USER_PASSWORD,
    database: "modify_ff"
});


module.exports = con;