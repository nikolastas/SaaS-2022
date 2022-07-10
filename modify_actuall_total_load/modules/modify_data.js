const CsvToJson = require('./CsvToJson.js');

function ModifyData(csv_json, folder, wanted_datetime) {
    // function that takes data in a json format and inserts it into the database
    // the wanted datetime must be 1 hour before the csv file datetime column
    //convert csv to json
    // let csv_json = CsvToJson(csv);
    
    //TODO: make a definite query
    let query = '';
    // datetime ISO8601 format to YYYY-MM-DD HH:MM:SS format
    let del_queries = [];
    let temp = "";

    if(folder == "aggrgenerationpertype") { 
        temp = "";
        
        for (let i = 0; i < csv_json.length ; i++) {
            temp += "('" + csv_json[i]['DateTime'] + "','" + csv_json[i]['ResolutionCode'] +"','"+ csv_json[i]['ProductionType'] + "','" + csv_json[i]['ActualGenerationOutput'] + "','" + csv_json[i]['ActualConsumption']+ "','" + csv_json[i]['UpdateTime'] + "','" + csv_json[i]['MapCode'] + "')" 
            if(i < csv_json.length - 1)
                temp += ",";
            // condition we need to delete new data to the db
            if(wanted_datetime != csv_json[i]["DateTime"].split(":")[0]) 
                del_queries.push(("DELETE FROM " + folder + " WHERE DateTime = '" + csv_json[i]["DateTime"] + "' AND ProductionType = '" + csv_json[i]['ProductionType'] + "' AND MapCode = '"+ csv_json[i]['MapCode'] +"';").replaceAll("'null'", null)); 

            
        }
        temp = temp.replaceAll("'null'", null);
        
        if (temp != ""){
            query += "INSERT INTO " +folder+ " VALUES " + temp + ";";
        }
        else{
            query = "";
        }
    }
    else if(folder == "physicalflows"){
        temp = "";
        for (let i= 0;i < csv_json.length ; i++ ) {
            temp += "('" + csv_json[i]['DateTime'] + "','" + csv_json[i]['ResolutionCode'] +"','"+ csv_json[i]['FlowValue'] + "','" + csv_json[i]['UpdateTime'] + "','" + csv_json[i]['InMapCode'] + "','" + csv_json[i]['OutMapCode']+ "')" 
            if(i < csv_json.length - 1)
                temp += ",";
            // condition we need to delete new data to the db
            if(wanted_datetime != csv_json[i]["DateTime"].split(":")[0]) {
                // append del_queries

                del_queries.push(("DELETE FROM " + folder + " WHERE DateTime = '" + csv_json[i]["DateTime"] + "' AND InMapCode = '" + csv_json[i]['InMapCode'] + "' AND OutMapCode = '"+ csv_json[i]['OutMapCode'] +"';").replaceAll("'null'", null)); 
            }
        }
        temp = temp.replaceAll("'null'", null);
        
        if (temp != ""){
            query += "INSERT INTO " +folder+ " VALUES " + temp + ";";
        }
        else{
            query = "";
        }

    }
    else if(folder == "actualtotalload"){
        temp = "";
        for (let i = 0; i < csv_json.length ; i++) {
            temp += "('" + csv_json[i]['DateTime'] + "','" + csv_json[i]['ResolutionCode'] +"','"+ csv_json[i]['TotalLoadValue'] + "','" + csv_json[i]['UpdateTime'] + "','" + csv_json[i]['MapCode'] +  "')" 
            if(i < csv_json.length - 1)
                temp += ",";
            // condition we need to delete new data to the db
            if(wanted_datetime != csv_json[i]["DateTime"].split(":")[0]) 
                del_queries.push(("DELETE FROM " + folder + " WHERE DateTime = '" + csv_json[i]["DateTime"] +  "' AND MapCode = '"+ csv_json[i]['MapCode'] +"';").replaceAll("'null'", null)); 

        }
        // delete the last comma
        temp = temp.replaceAll("'null'", null);
        if (temp != ""){
            query += "INSERT INTO " +folder+ " VALUES " + temp + ";";
        }
        else{
            query = "";
        }

    }
    else {
        concole.log("Wrong folder name");
        return;
    }

    // return 
    return [query, del_queries];
}
module.exports.ModifyData = ModifyData;