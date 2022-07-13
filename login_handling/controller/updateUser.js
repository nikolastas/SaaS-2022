const cred = require('../db_config.json');
const mysql = require("mysql");
const con = mysql.createConnection(cred.dbconf);
const sub_choose = require("../modules/sub_choose");
const take_data = require('../modules/MakeQueryFunction');



/**
 * @name UpdateUser
 * @description Updates the users subscription
 * @param {string} username the username of the given user
 * @param {string} email the email of the given user
 * @param {string} sub_length update subscription according to the value of sub_length value (1/3/6 months)
 * @param {string} subscription corresponds to the ongoing subscription (-1 -> never subscripted)
 *
 */
module.exports = function UpdateUser(username, email, sub_length, subscription) {
    //toISOString().slice(0, 19).replace('T', ' ');
    console.log(username + " " + email + " " + sub_length);

    if (subscription === '1') {
        let TimeEnd = new Date();
        let sql_query = `Select SubscriptionEndTime FROM subscriptions WHERE Username = '${username}' AND email = '${email}'`;


        async function takedate() {
            let res = await take_data(con, sql_query);
            TimeEnd = new Date((res[0].SubscriptionEndTime).getTime());
        }

        takedate().then(() => {

            console.log(TimeEnd);

            TimeEnd = sub_choose(sub_length, TimeEnd);
            let update_query = `Update subscriptions Set SubscriptionEndTime = '${TimeEnd}', SubcriptionType = 'VALID' WHERE Username = '${username}' AND email = '${email}'`;

            con.query(update_query, (err) => {
                if (err) throw err;
                console.log("User Updated Successfully");
            })
        })
    } else if(subscription === '0'){
        let TimeNow = new Date();
        let TimeEnd = new Date();
        console.log(TimeEnd);

        TimeNow = TimeNow.toISOString().slice(0, 19).replace('T', ' ');
        TimeEnd = sub_choose(sub_length, TimeEnd);

        let update_query = `Update subscriptions Set SubscriptionStartTime = '${TimeNow}', SubscriptionEndTime = '${TimeEnd}', SubcriptionType = 'VALID' WHERE Username = '${username}' AND email = '${email}'`;

        con.query(update_query, (err) => {
            if (err) throw err;
            console.log("User Updated Successfully");
        })
    }
}