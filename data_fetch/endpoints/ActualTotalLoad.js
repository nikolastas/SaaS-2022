const app = require("express");
const router = require("router");
const mysql = require("mysql");
require('dotenv').config();
const cred = require(process.env.DBCONFIGFILE);
const con = mysql.createConnection(cred.dbconf);

module.exports = function actualtotalload (req, res) {
    return new Promise (function (resolve, reject)  {
        // console.log(req.body.Date);
        let currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log(currentDate);
        const sql_query = `Select Datetime, TotalLoadValue, UpdateTime, MapCode from actualtotalload where
                        MapCode = '${req.body.MapCode}' AND Datetime between '${req.body.Date}' and '${currentDate}' ORDER BY  (Datetime) desc`
        console.log(sql_query);
        con.query(sql_query,(res,err)=>{
            if(err) throw err;
            console.log(res);
        })
    })
};


