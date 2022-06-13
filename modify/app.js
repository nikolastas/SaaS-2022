const express = require('express');
// const cors = require('cors');
// const auth = require('./utils/auth');
const run = require('./endpoints/routes.js');


const app = express();


// run the consumer
run();

module.exports = app;