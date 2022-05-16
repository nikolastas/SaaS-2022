const mysql = require('mysql');
const cred = require('../db_config.json');
const con = mysql.createConnection(cred.dbconf);

// module.exports  =  function checkSub(userID)  {
//
//     const sql_query = `SELECT SubscriptionEndTime FROM subscriptions WHERE username = '${userID}'`;
//
//     con.query(sql_query, (err, result) => {
//         if (err) throw err;
//         if (result.count === 0)  return -1 ;
//         let currentDateTime = new Date().getTime();
//         let time_end = (result[0].SubscriptionEndTime).getTime();
//         if (time_end > currentDateTime) {
//            return 1;
//         }
//         return 0;
//     });

    // console.log(x);
    // return x;

//}


module.exports  =  function checkSub(userID)  {
    return new Promise(function (resolve, reject){
        const sql_query = `SELECT SubscriptionEndTime FROM subscriptions WHERE username = '${userID}'`;
        con.query(sql_query, (err, result) => {
            if (err) reject(err);
            if (result.count === 0)  resolve(-1) ;
            let currentDateTime = new Date().getTime();
            let time_end = (result[0].SubscriptionEndTime).getTime();
            if (time_end > currentDateTime) {
                resolve(1);
            }
            resolve(0);
        });
    })
}