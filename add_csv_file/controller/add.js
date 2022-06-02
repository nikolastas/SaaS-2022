const fs = require('fs');

const CsvToJson = require('../../modules/CsvToJson.js');
const con = require("../utils/database.js");
const compare_csv = require('../../modules/compare-csv.js');
const readFileasync = require('../../modules/read-file-async.js');

// connect to database
con.connect( function(err){
    if (err) throw err;
    console.log("DB Connected");
});

function return_correct_data(csv_json, folder){
    let sql_query;
    if(folder == "aggrgenerationpertype"){     
        sql_query = "INSERT INTO aggrgenerationpertype VALUES"
        for (let i = 1; i < csv_json.length - 1; i++) {
            let temp = "('" + csv_json[i]['DateTime'] + "','" + csv_json[i]['ResolutionCode'] +"','"+ csv_json[i]['ProductionType'] + "','" + csv_json[i]['ActualGenerationOutput'] + "','" + csv_json[i]['ActualConsumption']+ "','" + csv_json[i]['UpdateTime'] + "','" + csv_json[i]['MapCode'] + "')" 
            if(i < csv_json.length - 2)
                temp += ",";
            sql_query += temp;
        }
        sql_query += ";";
        sql_query = sql_query.replaceAll("''", null);
    }

    else if(folder == "physicalflows"){     
        sql_query = "INSERT INTO physicalflows VALUES"
        for (let i = 1; i < csv_json.length - 1; i++) {
            let temp = "('" + csv_json[i]['DateTime'] + "','" + csv_json[i]['ResolutionCode'] +"','"+ csv_json[i]['FlowValue'] + "','"  + csv_json[i]['UpdateTime'] + "','" + csv_json[i]['InMapCode']  + "','" + csv_json[i]['OutMapCode']+ "')" 
            if(i < csv_json.length - 2)
                temp += ",";
            sql_query += temp;
        }
        sql_query += ";";
        sql_query = sql_query.replaceAll("''", null);
    }

    else if(folder == "actualtotalload") {
        sql_query = "INSERT INTO actualtotalload VALUES"
        for (let i = 1; i < csv_json.length - 1; i++) {
            let temp = "('" + csv_json[i]['DateTime'] + "','" + csv_json[i]['ResolutionCode'] +"','"+ csv_json[i]['TotalLoadValue'] + "','" + csv_json[i]['UpdateTime'] + "','" + csv_json[i]['MapCode'] + "')" 
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
        try{text_last = fs.readFileSync("./controller/"+ folder + "_last.txt");}
        catch{text_last = ''}
        

        let csv_original;
        if(text_last != '') {
            try{
                await compare_csv(filePath, text_last, "./data/"+folder+"/difference.csv");
                // csv_original = fs.readFileSync("./data/"+folder+"/difference.csv", 'utf8');
                csv_original = await readFileasync("./data/"+folder+"/difference.csv", false);
                
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
                csv_original = await readFileasync(filePath, true);

            }
            catch{
                res.status(400).send("Error2: File not found");
                return;
            }
            
        try{
        csv_json = CsvToJson(csv_original, '\t'); 

        // write latest input file in the text
        fs.writeFileSync("./controller/"+ folder + "_last.txt", filePath)

        // make query
        let sql_query = return_correct_data(csv_json, folder);
        
        res.status(200).send(sql_query)
        }
        catch{
           res.status(400).send("Error3: either making query or writing file");
        }
    }
    else {
        //send res error need parameters
        res.send("error with parameters");
    }
    
}