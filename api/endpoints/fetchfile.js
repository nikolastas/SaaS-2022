const express = require('express');
const router = express.Router();

function checker(req,res){
    res.status(200).send("all ok");
}

router.get('/fetch', checker);
module.exports = router;