const express = require('express');
const bodyParser = require("body-parser");
const test = require("./endpoints/ActualTotalLoad");
const router = require("router");
require('dotenv').config();
app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/home", (req, res) => {
    console.log("Home")
    res.status(200).send()
});


app.post("/test", (req, res) => {
    async function lol() {
        let result = await test(req, res);
        return result;
    }
    lol().then((d) => {
        console.log(d[0])
    });

    res.status(200).send()
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running...`);
});

