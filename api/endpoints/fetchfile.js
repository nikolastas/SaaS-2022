const express = require('express');
const router = express.Router();
const fs = require('fs');

getjson = function(csv){
    var lines = csv.toString().split("\r\n");

    var result = [];

    var headers=lines[0].split("\t");

    for(var i=1;i<lines.length;i++){

        var obj = {};
        var currentline=lines[i].split("\t");

        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }

    return result; //JavaScript object
    // return JSON.stringify(result); //JSON
}

function checker(req,res){
    try {
        const data = fs.readFileSync('./data/AGRT/2022_01_02_23_AggregatedGenerationPerType16.1.BC.csv', 'utf8');//directory of index.js
        let answer = getjson(data);
        res.status(200).send(answer);
      } catch (err) {
        console.error(err);
      }
}

router.get('/fetch', checker);
module.exports = router;