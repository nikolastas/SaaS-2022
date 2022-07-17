/**
 * @name take_data
 * @description returns a Promise of a query with given database information and a query string
 * @param {Connection} con the username of the given user
 * @param {string} sql_query the email of the given user
 */
module.exports = function take_data(con, sql_query) {
    return new Promise(function (resolve, reject) {
        // con.connect(function(err) {
        //     if (err) reject (err);
        con.query(sql_query, function (err, result) {
            if (err) reject(err);
            resolve(result);
        });

    });
}