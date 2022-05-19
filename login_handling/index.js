const express =  require('express');
const verifyUser = require('./modules/verifyUser.js')
const checkSubscription = require('./modules/check_sub.js')
const parseJwt = require('./modules/decodeToken')
const bodyParser = require("body-parser");
const {decode} = require("jsonwebtoken");
const AddUser = require('./controller/addUser')


const port = 6660 ;
app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/",(req,res) => {
    res.status(200).sendFile(__dirname + "/index.html");
})

app.get("/login", (req, res) => {
        res.status(200).sendFile(__dirname + "/login.html");
    }
)

app.get("/logout", (req,res)=>{
        res.status()
})

app.get("/home",(req,res)=>{

    let ans = {
        verified : 'false',
        name : '',
        userID : '',
        email : '',
        subscription : -2,
        errors: ''
    }
    const token = req.query.token;

    if(token){
        let decodeToken = parseJwt(token);
        console.log(decodeToken);

        ans.name = decodeToken.name;
        ans.userID = decodeToken.sub;
        ans.email = decodeToken.email;
        ans.verified = verifyUser(token).catch(console.error); //async function

        async function CheckSubs () {
            ans.subscription = await checkSubscription(decodeToken.sub);
        }

        CheckSubs().then(()=> {
            if(ans.verified === 'false'){
                ans.errors = "Unauthorized user";
                res.status(401).send(ans);
            }
            else{
                if(ans.subscription === -1)  {
                    console.log(ans.userID)
                    AddUser(ans.userID,ans.email);
                }

                res.status(200).send(ans);
            }
        })
    }
    else {
        res.status(401).send("Unauthorized user");
    }

});

app.listen(process.env.port || port, () => {
    console.log(`Server is running on port ${port}`);
});
