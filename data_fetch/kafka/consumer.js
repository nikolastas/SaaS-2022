const kafka_client = require('./kafka.js');
const take_data = require('../endpoints/make_query_function');
const import_data = require('../endpoints/ImportData');
const produce_string = require('./producer');
const mysql = require("mysql");
// require('dotenv').config();
// console.log(cred.dbconf);
const con = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "saas"
});

const con2 = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "test"
});

//if group id doesnt exist, throws some erorrs but then works just fine
const consumer = kafka_client.consumer({groupId: "my-consumer-group"})

const simple_consume = async () => {
    // first, we wait for the client to connect and subscribe to the given topic
    await consumer.connect()
    await consumer.subscribe({topic: "test_topic", fromBeginning: true}) //TODO: change it later to variable
    await consumer.run({
        // when new message in client
        eachMessage:
            async ({message}) => {
                if (message.value.toString() === "DATA READY") {
                    let sql_query1 = `SELECT * from actualtotalload LIMIT 5`;
                    let new_data = await take_data(con, sql_query1);
                    // let new_data = await TakeData();
                    console.log(new_data);
                    //TODO TRUNCATE TABLE actualtotalload;
                    let import_status = await import_data(con2, new_data);
                    console.log(`Status = ${import_status}`);
                    //TODO consumer in display/frontend different topic and group-id;
                    await produce_string("data_fetch", "DATA READY", 6);
                }

                // here, we just log the message to the standard output
                console.log(`received message: ${message.value}`)
            },
    })
}

simple_consume().catch((err) => {
    console.error("error in producer: ", err)
});
