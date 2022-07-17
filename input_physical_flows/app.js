const express = require('express');
const cors = require('cors');
const request = require('./controller/request.js');

const app = express();
const resetDB = require('./controller/reset.js');
const dot = require('dotenv');
dot.config();



// app.use(cors());
// app.use(auth);

let host_list = [
    // zaras keen project
    {
    "host":process.env.DATABASE_HOST,
    "user":process.env.DATABASE_USER,
    "password":process.env.DATABASE_USER_PASSWORD,
    "database":'input_ff',
    "tablename": 'physicalflows', 
    },
    {
    "host":process.env.DATABASE_HOST,
    "user":'root',
    "password":process.env.DATABASE_USER_PASSWORD,
    "database":'modify_ff',
    "tablename": 'physicalflows', 
    },
    {
    "host":process.env.DATABASE_HOST,
    "user": process.env.DATABASE_USER,
    "password": process.env.DATABASE_USER_PASSWORD,
    "database":'fetch_ff',
    "tablename": 'physicalflows', 
    },

];


let date = new Date("January 01, 2022 12:00:00");
let hh = 0;
// console.log(date);

async function get_data(req, res) {
// make date have next day
    
    // console.log(date);
    
    let result = await request.make_request(date, hh);
    if(hh === 23){
        hh = 0;
        
        date.setDate(date.getDate() + 1);
    }
    else{
        
        hh++;
    }
    res.set("Access-Control-Allow-Origin","*");
    res.send(result);
}

async function reset_databases(req, res) {
    date = new Date("January 01, 2022 12:00:00");
    hh = 0;
    let result;
    for(let hostElement of host_list) { 
       
       result =  await resetDB.ResetDB(hostElement);
       
    }   
    console.log(result);
    res.set("Access-Control-Allow-Origin","*");
    if(result.success){
        res.send(result).status(200);
    }
    else{
        res.send(result).status(500);
    }
    
}
app.use(cors());
app.get("/get_data", get_data)
app.get("/reset", reset_databases)




module.exports = app;