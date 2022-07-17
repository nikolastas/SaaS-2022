require('dotenv').config()
const mysql = require('mysql');
const cred = require(process.env.DBCONFIGFILE);
const con = mysql.createConnection(cred.dbconf);

/**
 * @name checkSub
 * @description Checks the users subscription status (-1 not in database/0 subscription ended/1 subscription valid)
 * @param {string} userID ID number of the given user
 */
module.exports = function checkSub(email) {
    return new Promise(function (resolve, reject) {
        const sql_query = `SELECT SubscriptionEndTime FROM subscriptions WHERE email = '${email}'`;
        con.query(sql_query, (err, result) => {
            if (err) reject(err);
            console.log(result);
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