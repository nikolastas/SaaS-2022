const express = require('express');
const bodyParser = require("body-parser");
const select_data = require("./endpoints/PhysicalFlows");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const simple_consume = require("./kafka/consumer");
const verifyUser = require('./middleware/verifyUser.js')
require('dotenv').config();
app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({credentials: true}));

app.get("/home", (req, res) => {
    console.log("Home")
    res.status(200).send()
});


app.post("/data_fetch/Physical", verifyUser, (req, res) => {

    async function promise_select_data() {
        return await select_data(req, res);
    }

    let accessToken = req.body.token
    res.set('authentication', accessToken);
    res.set("Access-Control-Allow-Origin", "*");

    promise_select_data()
        .then((d) => {
            if (d.length === 0) {
                res.status(503).send({"error": "No data available"});
            } else {
                res.status(200).send(d)
            }
        })
        .catch((err) => {
            res.status(406).send({"error": "error communicating with service bus"})
        })
});

simple_consume().catch((err) => {
    console.error("error in producer: ", err)
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running...`);
});

