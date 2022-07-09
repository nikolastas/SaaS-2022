require('dotenv').config()
const mysql = require('mysql');
const cred = require(process.env.DBCONFIGFILE);
const con = mysql.createConnection(cred.dbconf);

module.exports = function checkSub(userID) {
    return new Promise(function (resolve, reject) {
        const sql_query = `SELECT SubscriptionEndTime FROM subscriptions WHERE username = '${userID}'`;
        con.query(sql_query, (err, result) => {
            if (err) reject(err);
            if (!Object.keys(result).length) {
                resolve(-1);
            } else {
                let currentDateTime = new Date().getTime();
                let time_end = (result[0].SubscriptionEndTime).getTime();
                if (time_end > currentDateTime) {
                    resolve(1);
                }
                resolve(0);
            }
        });
    })
}