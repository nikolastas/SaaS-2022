const mysql = require('mysql2');

let con = mysql.createConnection({
    host: '35.240.28.143',
    user: 'root',
    password: 'root',
    database: 'modify_atl'
});


async function check(con, sql_query)  {
    return new Promise<string>(function (resolve, reject){
        
        con.connect(function(err) {
            if (err) reject (err);
            con.query(sql_query, function (err, result, fields) {
              if (err) reject (err);
              
                resolve(result);
            });
          });
    })
}
let a  = await check(con, "SELECT * FROM modify_atl;");
console.log(a);