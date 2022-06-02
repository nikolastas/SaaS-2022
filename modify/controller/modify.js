const fs = require('fs');
const con = require("../utils/database.js");
const CsvToJson = require('../../modules/CsvToJson.js');


con.connect( (err) => {
    if (err) throw err;
    console.log("DB connnected");
});

function ModifyData(csv, folder, wanted_datetime) {
    //convert csv to json
    let csv_json = CsvToJson(csv);
    
    //TODO: make a definite query
    let query = '';

    if(folder == "aggrgenerationpertype") { 

        for (let i = 1; i < csv_json.length - 1; i++) {
            let temp = "('" + csv_json[i]['DateTime'] + "','" + csv_json[i]['ResolutionCode'] +"','"+ csv_json[i]['ProductionType'] + "','" + csv_json[i]['ActualGenerationOutput'] + "','" + csv_json[i]['ActualConsumption']+ "','" + csv_json[i]['UpdateTime'] + "','" + csv_json[i]['MapCode'] + "')" 
            
            // condition we need to delete new data to the db
            if(wanted_datetime != csv_json[i]["DateTime"].split(':')[0]) 
                query += "DELETE FROM" + folder + "WHERE DateTime == '" + csv_json[i]["DateTime"] + "' AND ProductionType == '" + csv_json[i]['ProductionType'] + "' AND MapCode == '"+ csv_json[i]['MapCode'] +"';"; 

            query += "INSERT INTO " +folder+ " VALUES " + temp + ";";
        }
    }
    else if(folder == "physicalflows"){
        for (let i= 0;i < csv_json.length - 1; i++ ) {
            let temp = "('" + csv_json[i]['DateTime'] + "','" + csv_json[i]['ResolutionCode'] +"','"+ csv_json[i]['FlowValue'] + "','" + csv_json[i]['UpdateTime'] + "','" + csv_json[i]['InMapCode'] + "','" + csv_json[i]['OutMapCode']+ "')" 
            
            // condition we need to delete new data to the db
            if(wanted_datetime != csv_json[i]["DateTime"].split(':')[0]) 
                query += "DELETE FROM" + folder + "WHERE DateTime == '" + csv_json[i]["DateTime"] + "' AND InMapCode == '" + csv_json[i]['InMapCode'] + "' AND OutMapCode == '"+ csv_json[i]['OutMapCode'] +"';"; 

            query += "INSERT INTO " +folder+ " VALUES " + temp + ";";
        }
    }
    else if(folder == "actualtotalload"){
        
        for (let i = 1; i < csv_json.length - 1; i++) {
            let temp = "('" + csv_json[i]['DateTime'] + "','" + csv_json[i]['ResolutionCode'] +"','"+ csv_json[i]['TotalLoadValue'] + "','" + csv_json[i]['MapCode'] + "','" + csv_json[i]['UpdateTime'] +  "')" 
            
            // condition we need to delete new data to the db
            if(wanted_datetime != csv_json[i]["DateTime"].split(':')[0]) 
                query += "DELETE FROM" + folder + "WHERE DateTime == '" + csv_json[i]["DateTime"] +  "' AND MapCode == '"+ csv_json[i]['MapCode'] +"';"; 

            query += "INSERT INTO " +folder+ " VALUES " + temp + ";";
        }
    }
    else {
        concole.log("Wrong folder name");
        return;
    }

    con.query(query, (err, result) => {
        if (err) throw err;
        // remove this later if not needed
        console.log(result);
    });

    module.exports.modify = async (req,res) =>{
        res.send("Modified");
    }



}
