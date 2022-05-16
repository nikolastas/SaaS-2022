const fs = require('fs');
const papa =  require('papaparse');
const { config } = require('process');
const mysql = require('mysql2');



let con = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"root",
    database:"saas"
});

con.connect(function(err){
    if (err) throw err;
    console.log("DB Connected");
});


async function make_query(query, callback) {
    var connection = con;
    console.log(query);
    return await connection.query(query, (err, results) => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
}

async function get_columns(database) {
    let sql = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${database}'`;
    return await make_query(sql);
    
}


module.exports.upload_csv = async (req, res) => {
    let csvData = [];
    if(req.params.filename && req.params.foldername ){
        let file = req.params.filename;
        let folder = req.params.foldername;
        let filePath = `./data/${folder}/${file}`;

        const config = {
            delimiter: "",	// auto-detect
            newline: "",	// auto-detect
            quoteChar: '"',
            escapeChar: '"',
            header: false,
            transformHeader: undefined,
            dynamicTyping: false,
            preview: 0,
            encoding: "",
            worker: false,
            comments: false,
            step: undefined,
            complete: undefined,
            error: undefined,
            download: false,
            downloadRequestHeaders: undefined,
            downloadRequestBody: undefined,
            skipEmptyLines: false,
            chunk: undefined,
            chunkSize: undefined,
            fastMode: undefined,
            beforeFirstChunk: undefined,
            withCredentials: undefined,
            transform: undefined,
            delimitersToGuess: [',', '\t', '|', ';', papa.RECORD_SEP, papa.UNIT_SEP]
        }
        fs.createReadStream(filePath, { encoding: "utf-8" })
            .on('error', err => {
                console.log(err);
                res.status(500).send(err);
            })
            .on('data', data => {
                csvData.push(data);
                
            })
            .on("end", function () {
                let result = papa.parse(csvData.join(""), config);

                for(let i = 0; i < result.data.length; i++){
                    if (i>0){
                        let row = result.data[i];
                        con.query(`INSERT INTO ${folder} VALUES (?,?,?,?,?,?,?)`,
                        [row[0],row[1],row[6],row[7],row[8],row[9],row[4]],
                        (err, results) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send(err);
                            }
                        });
                    }
                }

                res.send("finished");    
                
                
            });

                
       
        

    }
    else{
        //send res error need parameters
        res.send("error with parameters");
    }
    
}