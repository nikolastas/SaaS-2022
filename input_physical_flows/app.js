const express = require('express');
// const cors = require('cors');
// const auth = require('./utils/auth');

const request = require('./controller/request.js');

const app = express();

// app.use(cors());
// app.use(auth);
request.make_request();




module.exports = app;