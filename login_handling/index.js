const express =  require('express');
// const handler = require('./login.js');
const jwt = require("jsonwebtoken");
const verifyUser = require('./modules/verifyUser.js')
const checkSubscription = require('./modules/check_sub.js')

app = express();

app.get("/",(req,res) => {
    res.status(200).sendFile(__dirname + "/index.html");
})


app.get("/login", (req, res) => {

        res.status(200).sendFile(__dirname + "/login.html");
    }
)

app.get("/home",(req,res)=>{
    const token = req.query.token;

    function parseJwt (token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    if(token){
        let decodeToken = parseJwt(token);
        console.log(decodeToken);
        // SQL QUERY TO GET ALL SUBSCRIPTION

        verifyUser(token).catch(console.error);
        // res.send(`Hello ${decodeToken.name}`);

        checkSubscription(decodeToken.sub).catch(console.error);
        res.send(`Hello ${decodeToken.name}`);

    }
    else {
        res.status(401).send("Unauthorized user");
    }

});

const port = 6660 ;
app.listen(process.env.port || port, () => {
    console.log(`Server is running on port ${port}`);
});
