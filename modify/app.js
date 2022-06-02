const express = require('express');
// const cors = require('cors');
// const auth = require('./utils/auth');

const routes = require('./endpoints/routes.js');


const app = express();

// app.use(cors());
// app.use(auth);


app.use('/', routes);


module.exports = app;