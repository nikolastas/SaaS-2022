const cred = require('../db_config.json');
const mysql = require("mysql");
const con = mysql.createConnection(cred.dbconf);
const sub_choose = require("../modules/sub_choose");

/**
 * @name AddUser
 * @description Adds new user to the database
 * @param {string} username the username of the given user
 * @param {string} email the email of the given user
 * @param {string} sub_length update subscription according to the value of sub_length value (1/3/6 months)
 *
 */
module.exports = function AddUser(username, email, sub_length) {
    //toISOString().slice(0, 19).replace('T', ' ');
    console.log(username + " " + email + " " + sub_length);
    let TimeNow = new Date();
    let TimeEnd = new Date();
    console.log(TimeEnd);
    console.log(sub_length);

    TimeNow = TimeNow.toISOString().slice(0, 19).replace('T', ' ');
    TimeEnd = sub_choose(sub_length, TimeEnd);
    let sql_query = `INSERT INTO subscriptions VALUES ('${username}','${email}','${TimeNow}','${TimeEnd}','') `;

    con.query(sql_query, (err) => {
        if (err) {
            if(err.code === "ER_DUP_ENTRY") {
                console.log("User alreasy exists");
            }
            else {
                console.error(err);
            }

        }
        console.log("User Created Successfully");
    })
}