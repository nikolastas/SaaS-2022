const kafka_client = require('./kafka.js');
const make_query_func = require('../endpoints/MakeQueryFunction');
const import_data = require('../endpoints/ImportData');
const produce_string = require('./producer');
const config = require('../config.json')
const mysql = require("mysql");

// require('dotenv').config();
// console.log(cred.dbconf);
//TODO check dotenv for config.json path;

const con_modify = mysql.createConnection(config.db_modify);
const con_datafetch = mysql.createConnection(config.db_datafetch);

//if group id doesnt exist, throws some errors but then works just fine
//TODO check if groupid needs change
const consumer = kafka_client.consumer({groupId: "atl2"})

const simple_consume = async () => {
    // first, we wait for the client to connect and subscribe to the given topic
    await consumer.connect()
    await consumer.subscribe({topic: config.kafka.consumer_topic, fromBeginning: true})
    await consumer.run({
        // when new message in client
        eachMessage:
            async ({message}) => {
                if (message.value.toString() === "DATA READY") {
                    //take the data from the modify microservice database
                    try{
                        let new_data = await make_query_func(con_modify, config.sql.SQL_QUERY_SELECT);
                        console.log(new_data);
                        //truncate table actualtotalload;
                        await make_query_func(con_datafetch, config.sql.SQL_QUERY_TRUNCATE);
                        //import new_data to the table
                        let import_status = await import_data(con_datafetch, new_data);
                        console.log(`Status = ${import_status}`);
                    }
                    catch(err){
                        console.log(err);
                    }
                    //TODO consumer in display/frontend different topic and group-id;
                    await produce_string(config.kafka.producer_topic, "DATA READY", 1);
                }

                // here, we just log the message to the standard output
                console.log(`received message: ${message.value}`)
            },
    })
}

// simple_consume().catch((err) => {
//     console.error("error in producer: ", err)
// });

module.exports = simple_consume
