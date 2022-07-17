const fs = require('fs');
const mysql = require("mysql2");
const CsvToJson = require('../modules/CsvToJson.js');
const con = require("../utils/database.js");
const compare_csv = require('../modules/compare-csv.js');
const readFileasync = require('../modules/read-file-async.js');
const make_query_function = require('../modules/make_query');

// connect to database
con.connect( function(err){
    if (err) throw err;
    console.log("DB Connected");
});

function return_correct_data(csv_json, folder){
    
    let sql_query="";
    // if(folder == "aggrgenerationpertype"){     
    //     // sql_query = "INSERT INTO aggrgenerationpertype VALUES"
    //     for (let i = 1; i < csv_json.length - 1; i++) {
    //         let temp = "('" + csv_json[i]['DateTime'] + "','" + csv_json[i]['ResolutionCode'] +"','"+ csv_json[i]['ProductionType'] + "','" + csv_json[i]['ActualGenerationOutput'] + "','" + csv_json[i]['ActualConsumption']+ "','" + csv_json[i]['UpdateTime'] + "','" + csv_json[i]['MapCode'] + "')" 
    //         if(i < csv_json.length - 2)
    //             temp += ",";
    //         sql_query += temp;
    //     }
    //     sql_query += ";";
    //     sql_query = sql_query.replaceAll("''", null);

    // }

    // sql_query = "INSERT INTO physicalflows VALUES"
    
    for (let i = 1; i < csv_json.length - 1; i++) {
        let temp = "('" + csv_json[i]['DateTime'] + "','" + csv_json[i]['ResolutionCode'] +"','"+ csv_json[i]['FlowValue'] + "','"  + csv_json[i]['UpdateTime'] + "','" + csv_json[i]['InMapCode']  + "','" + csv_json[i]['OutMapCode']+ "')" 
        if(i < csv_json.length - 2)
            temp += ",";
        sql_query += temp;
    }
    sql_query += ";";
    sql_query = sql_query.replaceAll("''", null);

    // else if(folder == "actualtotalload") {
    //     // sql_query = "INSERT INTO actualtotalload VALUES"
    //     for (let i = 1; i < csv_json.length - 1; i++) {
    //         let temp = "('" + csv_json[i]['DateTime'] + "','" + csv_json[i]['ResolutionCode'] +"','"+ csv_json[i]['TotalLoadValue'] + "','" + csv_json[i]['UpdateTime'] + "','" + csv_json[i]['MapCode'] + "')" 
    //         if(i < csv_json.length - 2)
    //             temp += ",";
    //         sql_query += temp;
    //     }
    //     sql_query += ";";
    //     sql_query = sql_query.replaceAll("''", null);
    // }
    
    if (sql_query=="" || sql_query==null|| sql_query==";"){
        console.log("No data to insert");
        return "";
    }
    else{
        sql_query = "INSERT INTO "+ folder + " VALUES" + sql_query;
        ;
        // wraios ! thanks
    }
    return sql_query;
}

module.exports.upload_csv = async function (folder, file) {
    // console.log("got in");
    let csvData = [];
    if(file && folder){
        
        let filePath = `./data/${folder}/${file}`;  

        let text_last;
        try{
            text_last = fs.readFileSync("./controller/"+ folder + "_last.txt");
        }
        catch{
            text_last = '';
        }
        

        let csv_original;
        if(text_last != '') {
            try{
                // console.log("in here");
                await compare_csv(filePath, text_last, "./data/"+folder+"/difference.csv");
                // csv_original = fs.readFileSync("./data/"+folder+"/difference.csv", 'utf8');
                csv_original = await readFileasync("./data/"+folder+"/difference.csv", false);
                
                // delete not recent file
                fs.unlinkSync(text_last);//wrong
            }
            catch{
                return("Error1: File not found");
                // return;
            }
        } 
        else{
            try{
                csv_original = await readFileasync(filePath, true);

            }
            catch{
                
                return("Error2: File not found");
                // return;
            }
        }  
        try{
        
        let csv_json = CsvToJson(csv_original, '\t'); 

        // write latest input file in the text
        fs.writeFileSync("./controller/"+ folder + "_last.txt", filePath)
        
        // make query
        let sql_query = return_correct_data(csv_json, folder);
        // console.log("sql: ",sql_query);
        if(sql_query != ""){
            try{
                await make_query_function(con, "truncate table "+ folder+";");
                // con.end();
                
            }catch(err){
                console.log(err);
                console.log("Error: cannot truncate table "+folder);
            }
            result_from_query = await make_query_function(con, sql_query);
            // con.end();
            if ("error" in result_from_query){throw result_from_query}
        }
        console.log("csv file made query to database");
        return(result_from_query)
        }
        catch{
           return("Error3: either making query or writing file");
        }
    }
    else {
        //send res error need parameters
        return("error with parameters");
    }
    
}
