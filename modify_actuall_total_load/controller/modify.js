const fs = require('fs');
const con = require("../utils/database.js");
const con_for_add_microservice = require("../utils/database_from_add_microservice.js");
const ModifyData = require("../modules/modify_data.js");
const make_query_function = require("../modules/make_query_function.js");





    

    module.exports.modify = async (req,res) =>{
        
        con.connect( (err) => {
            if (err) throw new Error("error with DB of modify");
            console.log("DB of modify connnected");
        });
        
        con_for_add_microservice.connect( (err) => {
            if (err) throw new Error("error with DB of add microservice");
            console.log("DB of add microservice connnected");
        });
        // database connected 
        let folders = ["physicalflows","actualtotalload","aggrgenerationpertype"] 
        let original_queries = [ 
            `
            SELECT DATE_FORMAT( DateTime,'%Y-%m-%d %H:%i:%s') as DateTime, ResolutionCode, FlowValue ,
            DATE_FORMAT(UpdateTime, '%Y-%m-%d %H:%i:%s') as UpdateTime,InMapCode, OutMapCode
            FROM physicalflows;
            `,
            `
            SELECT DATE_FORMAT( DateTime,'%Y-%m-%d %H:%i:%s') as DateTime, ResolutionCode,TotalLoadValue ,
            DATE_FORMAT(UpdateTime, '%Y-%m-%d %H:%i:%s') as UpdateTime,
            MapCode
            FROM actualtotalload;
            `,
            `
            
            SELECT DATE_FORMAT( DateTime,'%Y-%m-%d %H:%i:%s') as DateTime, ResolutionCode,ProductionType ,
            ActualGenerationOutput,ActualConsumption,
            DATE_FORMAT(UpdateTime, '%Y-%m-%d %H:%i:%s') as UpdateTime,
            MapCode
            FROM aggrgenerationpertype;
            `
        ]
        let data_from_tables = [];
        result_of_query_for_modify = [] ;
        for (let folder of folders){
            let result_of_query = await make_query_function(con_for_add_microservice, original_queries[folders.indexOf(folder)]);
            console.log(folder, result_of_query.length);
            data_from_tables[folder] = result_of_query;
            let datetime = "2022-01-01 00";
            let [query,del_queries] = ModifyData.ModifyData(result_of_query, folder, datetime);
            console.log(query,del_queries);
            if (del_queries.length > 0){
                for (let del_query of del_queries){
                    try{
                          
                        await make_query_function(con, `${del_query}`);
                    }catch(err){
                        console.log("error with delete_queries: ",err);
                        throw new Error("error2 with delete_queries");
                    
                    }
                }
                console.log("delete queries done, with length: ",del_queries.length);
            }
            try{
            result_of_query_for_modify[folder] = await make_query_function(con, query);
            } catch(err){
                console.log(err);
                throw new Error("error3 with query for modify");
            }
        }

        return ({status: "success", result:result_of_query_for_modify});
        // res.status(200).send("Data modified succesfully");
    }



