const fs = require('fs');
const csv =  require('papaparse');
module.exports.upload_csv = async (req, res) => {
    let csvData = [];
    if(req.params.filename && req.params.foldername ){
        let file = req.params.filename;
        let folder = req.params.foldername;
        let filePath = `./data/${folder}/${file}`;

        // read csv with fs

        fs.createReadStream(filePath)
        .pipe(csv.parse({seperator: "/t"}))
        .on('error' ,function(){
            res.status(500).send({"status":"failed"});
        })
        .on('data', function(row){
            csvData.push(row);
        })
        .on('end', function(){
            console.log(csvData[1]);
            res.send("ok");
        });
        

    }
    else{
        //send res error need parameters
        res.send("error with parameters");
    }
    
}