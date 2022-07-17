const mysql = require("mysql2");
const dot = require("dotenv");
dot.config();

let con = mysql.createConnection({
    // host: "localhost",
    // user:"root",
    // password:"root",
    // database:"input_total"
    host: process.env.INPUT_DATABASE_HOST,//needs to be changed to unix sock
    user: process.env.INPUT_DATABASE_USER,
    password: process.env.INPUT_DATABASE_USER_PASSWORD,
    database: process.env.INPUT_DATABASE_NAME
});


module.exports = con;