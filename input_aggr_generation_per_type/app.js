const express = require('express');
const fs = require('fs');
const path = require('path');
const request = require('./controller/request.js');
const cors = require('cors');
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
    "database":'input_agrt',
    "tablename": 'aggrgenerationpertype', 
    },
    {
    "host":process.env.DATABASE_HOST,
    "user":process.env.DATABASE_USER,
    "password":process.env.DATABASE_USER_PASSWORD,
    "database":'modify_agrt',
    "tablename": 'aggrgenerationpertype', 
    },
    {
    "host":process.env.DATABASE_HOST,
    "user": process.env.DATABASE_USER,
    "password": process.env.DATABASE_USER_PASSWORD,
    "database":'fetch_agrt',
    "tablename": 'aggrgenerationpertype', 
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
    let counter =0;
    try {
        const direcotry = "data/aggrgenerationpertype/";
        let files = fs.readdirSync(direcotry);
        for (const file of files) {
            console.log((path.join(__dirname,direcotry, file)))
            fs.unlinkSync(path.join(__dirname,direcotry, file));
            counter++;
        };    
        const directory2 = "/controller/aggrgenerationpertype_last.txt";
        console.log(path.join(directory2));
        fs.unlinkSync(path.join(__dirname,directory2));
        counter++;
    }catch(err) {
        console.log(err);
    }  
    console.log("TOTAL FILES DELETED: " + counter); 
    // console.log(result);
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