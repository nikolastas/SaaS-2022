const cred = require('../db_config.json');
const mysql = require("mysql");
const con = mysql.createConnection(cred.dbconf);
const sub_choose = require("../modules/sub_choose");

module.exports = function AddUser(username, email, sub_length) {
    //toISOString().slice(0, 19).replace('T', ' ');
    console.log(username + " " + email + " " + sub_length);
    let TimeNow = new Date();
    let TimeEnd = new Date();
    console.log(TimeEnd);

    TimeNow = TimeNow.toISOString().slice(0, 19).replace('T', ' ');
    TimeEnd = sub_choose(sub_length, TimeEnd);
    let sql_query = `INSERT INTO subscriptions VALUES ('${username}','${email}','${TimeNow}','${TimeEnd}','') `;

    con.query(sql_query, (err) => {
        if (err) throw err;
        console.log("User Created Successfully");
    })
}