const express =  require('express');
const bodyParser = require("body-parser");
const test = require("./endpoints/ActualTotalLoad");
require('dotenv').config()
app = express();
app.use(bodyParser.urlencoded({ extended: true }));





const file_path = "./endpoints/"
app.get("/home",(req,res)=>{
});


app.get("/test", (req, res) =>{
    test(req,res).then();
    res.status(200).send()
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running...`);
});

