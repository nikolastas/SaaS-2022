const express = require('express');
const app = express();

const https = require('https');
const fs = require('fs');
const port = 9103;
var path = require('path');

const baseUrl = '/';

var options = {
    key: fs.readFileSync(path.join(__dirname, '\\Certificate\\cert\\localhost\\localhost.decrypted.key')),
    cert: fs.readFileSync(path.join(__dirname, '.\\Certificate\\cert\\localhost\\localhost.crt')),
    // requestCert: true,
    // ca: [fs.readFileSync(path.join(__dirname, '.\\Certificate\\CA\\CA.pem'))]
}
//the api needs a datetime in this specific form: YYYY_MM_DD_HH, e.g. 2022_01_01_01
app.get(baseUrl+"AGRT/:datetime", (req,res) => {
    res.status(200).download("./data/AGRT/"+req.params.datetime+"_AggregatedGenerationPerType16.1.BC.csv");
    console.log("AGRT file sent");
})

app.get(baseUrl+"ATL/:datetime", (req,res) => {
    res.status(200).download("./data/ATL/"+req.params.datetime+"_ActualTotalLoad6.1.A.csv");
    console.log("ATL file sent");
})

app.get(baseUrl+"FF/:datetime", (req,res) => {
    res.status(200).download("./data/FF/"+req.params.datetime+"_PhysicalFlows12.1.G.csv");
    console.log("FF file sent");
})
https.createServer(options, app).listen(port);