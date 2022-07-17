const app = require("express");
// const router = require("router");
const mysql = require("mysql");
require('dotenv').config();
const cred = require(process.env.DBCONFIGFILE);
// const {hashPassword} = require("mysql/lib/protocol/Auth");

const con = mysql.createConnection(cred.db_datafetch);

module.exports = function aggrgenerationpertype(req) {
    return new Promise(function (resolve) {
        // console.log(req.body.Date);
        let currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const sql_query = `Select * from aggrgenerationpertype where MapCode = '${req.body.MapCode}' AND ProductionType = '${req.body.ProductionType}' AND Datetime between '${req.body.Date}' and '${currentDate}' ORDER BY  (Datetime) asc`

        con.query(sql_query, (err, res) => {

            if (err) console.log(err);
            resolve(res);
        });
    })
};