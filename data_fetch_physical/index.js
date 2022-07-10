const express = require('express');
const bodyParser = require("body-parser");
const select_data = require("./endpoints/PhysicalFlows");
// const router = require("router");
const jwt = require("jsonwebtoken");
const simple_consume = require("./kafka/consumer");
const verifyUser = require('./middleware/verifyUser.js')
require('dotenv').config();
app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/home", (req, res) => {
    console.log("Home")
    res.status(200).send()
});


app.post("/data_fetch/Physical", verifyUser, (req, res) => {

    async function promise_select_data() {
        return await select_data(req, res);
    }

    const data = {
        username: req.body.user,
        email: req.body.email,
        userID: req.body.userID
    };

    console.log(JSON.stringify(data));

    const accessToken = jwt.sign(data, process.env.MY_SECRET_KEY)
    res.set('authentication', accessToken);

    promise_select_data().then((d) => {
        if(d.length === 0){
            res.status(503).send({"error" : "No data available"});
        } else {
            res.status(200).send(d)
        }
    });
});

simple_consume().catch((err) => {
    console.error("error in producer: ", err)
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running...`);
});

