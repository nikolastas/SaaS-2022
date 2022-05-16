const mysql = require('mysql');
const cred = require('../db_config.json')
const con = mysql.createConnection(cred.dbconf);


module.exports = async function checkSub(userID)  {

    const sql_query = `SELECT SubscriptionEndTime FROM subscriptions WHERE username = '${userID}'`;

    con.connect(function(err) {
        if (err) throw err;
        con.query(sql_query, (err, result) => {
            if (err) throw err;
            // console.log(result[0].SubscriptionEndTime);

            let currentDateTime = new Date().getTime();
            let time_end = (result[0].SubscriptionEndTime).getTime();
            if (time_end > currentDateTime) console.log(true)
        });
    });
}
