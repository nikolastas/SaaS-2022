const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var session = require('./session');



const sql_params = {
    host: "localhost",
    user: "root",
    password: "",
    database: "tl21"
}

function dohealthcheck(req,res){
    var temp = session.get_auth(req);
    
    var auth = temp.auth;
    var op  = temp.op;
    if(auth == false || parseInt(auth) < 2){
        res.status(401).send({"status":"NOT AUTHORIZED"}).end();
    }
    else{
        var con = mysql.createConnection(sql_params);

        con.connect(function(err) {
            if (err) {
                let json = {
                    'status' : 'failed',
                    'dbconnection' : sql_params.host,
                    'user': sql_params.user,
                    'database_name' : sql_params.database
                }
                res.status(500).send(json)
                return console.log('error: ' + err.message);
            }

            let json = {
                'status' : 'OK',
                'dbconnection' : sql_params.host,
                'user': sql_params.user,
                'database_name': sql_params.database
            }
            res.status(200).send(json);
            console.log("Health Check OK")
            con.end();
        });
    }
}

router.get('/admin/healthcheck', dohealthcheck);
module.exports = router;