const express = require('express');

const request = require('./controller/request.js');

const app = express();

request.make_request();
module.exports = app;