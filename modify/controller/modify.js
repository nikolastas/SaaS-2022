const fs = require('fs');
const con = require("../utils/database.js");
const con_for_add_microservice = require("../utils/database_from_add_microservice.js");
const ModifyData = require("../modules/modify_data.js");
const make_query_function = require("../modules/make_query_function.js");





    

    module.exports.modify = async (req,res) =>{
        try{
            con.connect( (err) => {
                if (err) throw err;
                console.log("DB connnected");
            });
        } catch(err){
            console.log(err);
            res.status(500).send("database error");
            return;
        }
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
                try{
                    for (let del_query of del_queries){
                        await make_query_function(con, del_query);
                    }
                }catch(err){
                    console.log("delete_queries: ",err);
                
                }
            }
            try{
            result_of_query_for_modify[folder] = await make_query_function(con, query);
            } catch(err){
                console.log(err);
                res.status(500).send(err);
                return;
            }
        }

        
        res.send(result_of_query_for_modify);
    }



