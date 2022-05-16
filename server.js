const express =  require('express');
const handler = require('./login_handling/login.js');
const jwt = require("jsonwebtoken");
const verifyUser = require('./verifyUser.js')
const add = require("./add_csv_file/add.js");
app = express();

app.get("/",(req,res) => {
    res.status(200).sendFile(__dirname + "/index.html");
})


app.get("/login", (req, res) => {
    
    res.status(200).sendFile(__dirname + "/login_handling/login.html");
}
)
app.get("/upload/:filename", add.upload_csv);

app.get("/home",(req,res)=>{
    const token = req.query.token;
    // decode token with jwt
    // if (token) {
    //     // verifies secret and checks exp
    //     jwt.verify(token, "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", (err, decoded) => {
    //         if (err) {
    //             return res.status(401).json({
    //                 message: "Unauthorized, wrong token"
    //             });
    //         } else {
    //             // if everything is good, save to request for use in other routes
    //             req.decoded = decoded;
    //             res.status(200).sendFile(__dirname + "/home.html");
    //         }
    //     });
    // } else {
    //     // if there is no token
    //     // return an error
    //     return res.status(401).send({
    //         message: "Unauthorized"
    //     });
    // }
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };
    
    if(token){
        let decodeToken = parseJwt(token);
        console.log(decodeToken);
        // SQL QUERY TO GET ALL SUBSCRIPTION
        let query = `SELECT SubcriptionType FROM subscription WHERE username = '${decodeToken.sub}'`;
        //TODO: move the verifyUser to an apropriate location
        verifyUser(handler.CLIENT_ID, token).catch(console.error);
        res.send(`Hello ${decodeToken.name}`);
    }
    else {
        res.status(401).send("Unauthorized user");
    }

});

var port = 6660 ;
app.listen(process.env.port || port, () => {
    console.log(`Server is running on port ${port}`);
});
