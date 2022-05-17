const express = require('express');
const app = express();

const https = require('https');
const fs = require('fs');

const cors = require('cors');

const port = 9103;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var path = require('path');

const baseUrl = '/';

app.get(baseUrl, (req, res) => {
    res.status(200).send('Test just worked!! ');
});
app.use(express.static(path.join(__dirname, '.')));

var options = {
    key: fs.readFileSync(path.join(__dirname, '\\Certificate\\CA\\localhost\\localhost.decrypted.key')),
    cert: fs.readFileSync(path.join(__dirname, '.\\Certificate\\CA\\localhost\\localhost.crt'))
}

const endpoint_path = "./endpoints/";
const fetchfile = require(endpoint_path + "fetchfile.js");

app.use(cors({credentials: true}));
app.use(baseUrl, fetchfile);

https.createServer(options, app).listen(port);