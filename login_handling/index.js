const express = require('express');
const verifyUser = require('./middleware/verifyUser.js')
const cors = require('cors');
const checkSubscription = require('./modules/check_sub.js')
// const parseJwt = require('./modules/decodeToken')
const bodyParser = require("body-parser");
const AddUser = require('./controller/addUser');
const UpdateUser = require('./controller/updateUser');
const EndSub = require('./controller/end_sub');
// const jwt = require("jsonwebtoken");
// const take_data = require("./modules/MakeQueryFunction");
require('dotenv').config()

app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(cors({credentials: true}));

app.post("/home", verifyUser, (req, res) => {

    let ans = {
        name: '',
        userID: '',
        email: '',
        subscription: -2,
        errors: ''
    }

    ans.name = req.body.name;
    ans.userID = req.body.sub;
    ans.email = req.body.email;

    async function CheckSubs() {
        // redirect client through frontend based on subscription value
        ans.subscription = await checkSubscription(ans.email);
    }

    CheckSubs()
        .then(() => {
            res.set('authentication', req.body.token);
            res.set("Access-Control-Allow-Origin","*");
            res.status(200).send(ans);
            console.log(ans);
        })
        .catch(console.error)
});

// update subscription according to the value of req.body.sub_length value (1/3/6 months)
// subscription value corresponds to the ongoing subscription (-1 -> never subscripted)
// used when user is not in subscriptions table
app.post("/subscription/NewSub", verifyUser, (req, res) => {
    AddUser(req.body.name, req.body.email, req.body.sublength)
    res.set('authentication', req.body.token);
    res.set("Access-Control-Allow-Origin","*");
    res.status(200).send({
        log: "Subscription created successfully"
    });
})

// update subscription according to the value of req.body.sub_length value (1/3/6 months)
// subscription value corresponds to the ongoing subscription (1-> active, 0-> expired, -1 -> never subscripted)

app.post("/subscription/UpdateSub", verifyUser, (req, res) => {
    UpdateUser(req.body.name, req.body.email, req.body.sublength, req.body.subscription);
    res.set('authentication', req.body.token);
    res.set("Access-Control-Allow-Origin","*");
    res.status(200).send( {
            log: "Subscription updated successfully"
    });
})
// endpoint used for checking when the subscription of the user is ending
app.post("/subscription/EndSub", verifyUser, (req, res) => {

    let resdate = new Date();

    async function FindEndTime() {
        let rest = await EndSub(req.body.name);
        resdate = new Date(rest);
        // console.log(resdate);
    }

    FindEndTime().then(() => {

        res.set('authentication', req.body.token);
        res.set("Access-Control-Allow-Origin","*");
        res.status(200).send({
            SubscriptionEndTime: resdate
        });
    }).catch((e) => {
        res.status(501).send({errors: e})
    })
});

app.post("/check", verifyUser, (req, res) => {
    res.set('authentication', req.body.token);
    res.set("Access-Control-Allow-Origin","*");
    res.status(200).send("Test passed successfully");

})

app.post("/logout",verifyUser,(req,res)=>{
    res.set("Access-Control-Allow-Origin","*");
    res.status(200).send({
        log:"Logout Successfull"
    })
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running...`);
});
