const express =  require('express');
const verifyUser = require('./modules/verifyUser.js')
const checkSubscription = require('./modules/check_sub.js')
const parseJwt = require('./modules/decodeToken')
const bodyParser = require("body-parser");
const AddUser = require('./controller/addUser')
const jwt = require("jsonwebtoken");
require('dotenv').config()

app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// app.get("/",(req,res) => {
//     res.status(200).sendFile(__dirname + "/index.html");
// })
//TODO: this belongs in frontend
app.get("/login", (req, res) => {

        res.status(200).sendFile(__dirname + "/login.html");
})

// app.get("/logout", (req,res)=>{
//         res.status()
// })


app.get("/home",(req,res)=>{

    let ans = {
        name : '',
        userID : '',
        email : '',
        subscription : -2,
        errors: ''
    }
    const token = req.query.token;
    // console.log(token);

    if(token){
        let decodeToken = parseJwt(token);
        console.log(decodeToken);

        ans.name = decodeToken.name;
        ans.userID = decodeToken.sub;
        ans.email = decodeToken.email;

        async function CheckSubs () {
            ans.subscription = await checkSubscription(decodeToken.sub);
        }

        CheckSubs()
        .then(()=> {

            const data = {
                username :  ans.name,
                email : ans.email,
                userID : ans.userID
            };

            const accessToken = jwt.sign(data, process.env.MY_SECRET_KEY)
            console.log(accessToken);
            res.set('authentication',accessToken);
            if(ans.subscription >= 0){
                res.status(200).send({
                    log: "Request Completed"
                });
            }
            else if(ans.subscription === -1)  {
                AddUser(ans.userID,ans.email);
                ans.subscription = 0;
                ans.errors = " ";
                res.status(200).send(ans);
            }
            console.log(ans);
        })
        .catch(console.error)
    }

    else {
        res.status(401).send({
            errors:"Unauthorised User"
        });
    }

});

app.get("/test", verifyUser, (req, res) =>{

    res.status(200).send()

})

app.listen(process.env.PORT, () => {
    console.log(`Server is running...`);
});
