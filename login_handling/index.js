const express = require('express');
const verifyUser = require('./middleware/verifyUser.js')
const checkSubscription = require('./modules/check_sub.js')
const parseJwt = require('./modules/decodeToken')
const bodyParser = require("body-parser");
const AddUser = require('./controller/addUser');
const UpdateUser = require('./controller/updateUser');
const EndSub = require('./controller/end_sub');
const jwt = require("jsonwebtoken");
const take_data = require("./modules/MakeQueryFunction");
require('dotenv').config()

app = express();

app.use(bodyParser.urlencoded({extended: false}));

// app.get("/",(req,res) => {
//     res.status(200).sendFile(__dirname + "/index.html");
// })
//TODO: this belongs in frontend
app.get("/login", (req, res) => {

    res.status(200).sendFile(__dirname + "/login.html");
})

//TODO: check logout in frontend

// app.get("/logout", (req,res)=>{
//         res.status()
// })


app.get("/home", (req, res) => {

    let ans = {
        name: '',
        userID: '',
        email: '',
        subscription: -2,
        errors: ''
    }
    const token = req.query.token;
    // console.log(token);

    if (token) {
        let decodeToken = parseJwt(token);
        console.log(decodeToken);

        ans.name = decodeToken.name;
        ans.userID = decodeToken.sub;
        ans.email = decodeToken.email;

        async function CheckSubs() {
            ans.subscription = await checkSubscription(decodeToken.sub);
        }

        CheckSubs()
            .then(() => {

                const data = {
                    username: ans.name,
                    email: ans.email,
                    userID: ans.userID
                };

                console.log(JSON.stringify(data));

                const accessToken = jwt.sign(data, process.env.MY_SECRET_KEY)
                console.log(accessToken);
                res.set('authentication', accessToken);
                // if(ans.subscription >= 0){
                //     res.status(200).send({
                //         log: "Request Completed"
                //     });
                // }
                // else if(ans.subscription === -1)  {
                // AddUser(ans.userID,ans.email);
                // ans.subscription = 0;
                // ans.errors = " ";
                res.status(200).send(ans);
                // }
                console.log(ans);
            })
            .catch(console.error)
    } else {
        res.status(401).send({
            errors: "Unauthorised User"
        });
    }
});

app.get("/test", verifyUser, (req, res) => {

    res.status(200).send("ZEOS");

})

app.post("/subscription/NewSub", verifyUser, (req, res) => {
    AddUser(req.body.user, req.body.email, req.body.sublength);

    const data = {
        username: req.body.user,
        email: req.body.email,
        userID: req.body.userID
    };

    console.log(JSON.stringify(data));

    const accessToken = jwt.sign(data, process.env.MY_SECRET_KEY)

    res.set('authentication', accessToken);

    res.status(200).send("ZEOS");
})

app.post("/subscription/UpdateSub", verifyUser, (req, res) => {
    UpdateUser(req.body.user, req.body.email, req.body.sublength, req.body.subscription);

    const data = {
        username: req.body.user,
        email: req.body.email,
        userID: req.body.userID
    };

    console.log(JSON.stringify(data));

    const accessToken = jwt.sign(data, process.env.MY_SECRET_KEY)

    res.set('authentication', accessToken);

    res.status(200).send("ZEOS");
})

app.post("/subscription/EndSub", verifyUser, (req, res) => {

    let resdate = new Date();

    async function FindEndTime() {
        let res = await EndSub(req.body.user);
        resdate = new Date(res)
        // console.log(resdate);
    }

    FindEndTime().then(() => {

        const data = {
            username: req.body.username,
            email: req.body.email,
            userID: req.body.userID
        };

        const accessToken = jwt.sign(data, process.env.MY_SECRET_KEY)

        res.set('authentication', accessToken);

        res.status(200).send({
            SubscriptionEndTime: resdate
        });
    })
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running...`);
});
