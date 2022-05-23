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

module.exports.upload_csv = async (req, res) => {
    let csvData = [];
    if(req.params.filename && req.params.foldername){
        let file = req.params.filename;
        let folder = req.params.foldername;
        let filePath = `./data/${folder}/${file}`;  

        let text;
        try{text = fs.readFileSync("./"+ folder + "_last.txt");}
        catch{text = ''}
        

        if(text !== '') {
            await compare_csv(text, filePath, "./"+folder+"/difference.csv");
            let csv_original = fs.readFileSync("./"+folder+"/difference.csv", 'utf8');
            // delete not recent file
            fs.unlinkSync(text);
        } 
        else
            let csv_original = fs.readFileSync(filePath, 'utf8');
        
        let csv_json = CsvToJson(csv_original, '\t'); 


        // write latest input file in the text
        fs.writeFileSync("./"+ folder + "_last.txt", filePath)


        let sql_query;
        if(folder == "aggrgenerationpertype"){     
            sql_query = "INSERT INTO aggrgenerationpertype () VALUES"
            for (let i = 0; i < csv_json.length - 1; i++) {
                let temp = "('" + csv_json[i]['DateTime'] + "','" + csv_json[i]['ResolutionCode'] +"','"+ csv_json[i]['ProductionType'] + "','" + csv_json[i]['ActualGenerationOutput'] + "','" + csv_json[i]['ActualConsumption']+ "','" + csv_json[i]['UpdateTime'] + "','" + csv_json[i]['AreaName'] + "')" 
                if(i < csv_json.length - 2)
                    temp += ",";
                sql_query += temp;
            }
            sql_query += ";";
            sql_query = sql_query.replaceAll("''", null);
        }

        else if(folder == "physicalflows"){     
            sql_query = "INSERT INTO physicalflows VALUES"
            for (let i = 0; i < csv_json.length - 1; i++) {
                let temp = "('" + csv_json[i]['DateTime'] + "','" + csv_json[i]['ResolutionCode'] +"','"+ csv_json[i]['FlowValue'] + "','"  + csv_json[i]['UpdateTime'] + "','" + csv_json[i]['InAreaName']  + "','" + csv_json[i]['OutAreaName']+ "')" 
                if(i < csv_json.length - 2)
                    temp += ",";
                sql_query += temp;
            }
            sql_query += ";";
            sql_query = sql_query.replaceAll("''", null);
        }

        else if(folder == "actualtotalload") {
            sql_query = "INSERT INTO actualtotalload VALUES"
            for (let i = 0; i < csv_json.length - 1; i++) {
                let temp = "('" + csv_json[i]['DateTime'] + "','" + csv_json[i]['ResolutionCode'] +"','"+ csv_json[i]['TotalLoadValue'] + "','" + csv_json[i]['UpdateTime'] + "','" + csv_json[i]['AreaName'] + "')" 
                if(i < csv_json.length - 2)
                    temp += ",";
                sql_query += temp;
            }
            sql_query += ";";
        }

        res.send(sql_query)
    }
    else{
        //send res error need parameters
        res.send("error with parameters");
    }
    
}