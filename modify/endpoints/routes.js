const express = require('express');
const add = require('../controller/modify.js');
// every microservice must have its own modify_controller 
const modify_controller = require('../controller/modify_aggr.js');
const kafka_consumer = require('../kafka/consumer.js');
const kafka_producer = require('../kafka/producer.js');
// const answersController = require('../controllers/answers');
// const isAuth = require('../middlewares/authentication')
let key = 1;
async function foo(message){
    let message_data_ready = message.value.toString().split(":")[0];
    let datetime  = message.value.toString().split(":")[1];
    if (message_data_ready === "DATA READY"){
        console.log("DATA READY");
        try{
            let result = await modify_controller.modify(datetime);
            console.log("result: ", result.status);
        }catch(err){
            console.log(err);

        }
        // cnage kafka topic !
        await kafka_producer("data_modify_aggr", "DATA READY", key);
        key += 1;
    }
}
async function run () {
kafka_consumer(foo).catch((err) => {
    console.error("error in producer: ", err)
});
};
module.exports = run;