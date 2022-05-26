const fs = require('fs');
const { config } = require('process');
const mysql = require('mysql2');
const CsvToJson = require('../modules/CsvToJson.js')
const child_process = require('child_process');
const compare_csv = require('../modules/compare-csv.js')


let con = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"root",
    database:"saas"
});

con.connect( function(err){
    if (err) throw err;
    console.log("DB Connected");
});

//TODO: implement it in the correct microservice
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

//helper function for filling empty with the "stuffing" of our choice
function FillEmptyString (str, stuffing) {
    return str === ''? stuffing : str;
}

function return_correct_data(csv_json, folder){
    let sql_query;
    if(folder == "aggrgenerationpertype" || folder == "actualtotalload" ){
        
        sql_query = "INSERT INTO "+ folder +" VALUES"
        for (let i = 0; i < csv_json.length - 1; i++) {
            let temp = "('" + csv_json[i]['DateTime'] + "','" + csv_json[i]['ResolutionCode'] +"','"+ csv_json[i]['TotalLoadValue'] + "','" + csv_json[i]['UpdateTime'] + "','" + csv_json[i]['MapCode'] + "')" 
            if(i < csv_json.length - 2)
                temp += ",";
            sql_query += temp;
        }
        sql_query += ";";
        sql_query = sql_query.replaceAll("''", null);
    }
    else if( folder == "physicalflows"){
        sql_query = "INSERT INTO "+ folder+" VALUES"
        for (let i = 0; i < csv_json.length - 1; i++) {
            let temp = "('" + csv_json[i]['DateTime'] + "','" + csv_json[i]['ResolutionCode'] +"','"+ csv_json[i]['FlowValue'] + "','"  + csv_json[i]['UpdateTime'] + "','" + csv_json[i]['InMapCode']  + "','" + csv_json[i]['OutMapCode']+ "')" 
            if(i < csv_json.length - 2)
                temp += ",";
            sql_query += temp;
        }
        sql_query += ";";
        sql_query = sql_query.replaceAll("''", null);
    }
    return sql_query;
}

module.exports.upload_csv = async (req, res) => {
    let csvData = [];
    if(req.params.filename && req.params.foldername){
        let file = req.params.filename;
        let folder = req.params.foldername;
        let filePath = `./data/${folder}/${file}`;  

        let text_last;
        try{text_last = fs.readFileSync("./add_csv_file/"+ folder + "_last.txt");}
        catch{text_last = ''}
        

        let csv_original;
        if(text_last != '') {
            try{
                await compare_csv(filePath, text_last, "./data/"+folder+"/difference.csv");
                csv_original = fs.createReadStream("./data/"+folder+"/difference.csv", 'utf8');
            // delete not recent file
            // fs.unlinkSync(text_last);
            }
            catch{
                res.status(400).send("Error1: File not found");
                return;
            }
        } 
        else
            try{
                csv_original = fs.readFileSync(filePath, 'utf8');
            }
            catch{
                res.status(400).send("Error2: File not found");
            }
            
        try{
        csv_json = CsvToJson(csv_original, '\t'); 


        // write latest input file in the text
        fs.writeFileSync("./add_csv_file/"+ folder + "_last.txt", filePath)

        // make query
        let sql_query = return_correct_data(csv_json, folder);
        

        res.status(200).send(sql_query)
        }
        catch{
            res.status(400).send("Error3: either making query or writing file");
        }
    }
    else{
        //send res error need parameters
        res.send("error with parameters");
    }
    
}