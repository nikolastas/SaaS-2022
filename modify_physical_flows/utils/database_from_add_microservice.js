const mysql = require("mysql2");
const dot =  require("dotenv");
dot.config();

let con = mysql.createConnection({
    // host: "localhost",
    // user:"root",
    // password:"root",
    // database:"input_ff"
    host: process.env.DATABASE_HOST ,//needs to be changed to unix sock
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_USER_PASSWORD,
    database: "input_ff"
});


module.exports = con;