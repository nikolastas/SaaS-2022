require('dotenv').config()
const mysql = require('mysql');
const cred = require(process.env.DBCONFIGFILE);
const con = mysql.createConnection(cred.dbconf);

module.exports = function endSub(username) {
    return new Promise(function (resolve, reject) {
        const sql_query = `SELECT SubscriptionEndTime FROM subscriptions WHERE username = '${username}'`;
        con.query(sql_query, (err, result) => {
            if (err) reject(err);
            let time_end = (result[0].SubscriptionEndTime).getTime();
            resolve(time_end);
        });
    })
}