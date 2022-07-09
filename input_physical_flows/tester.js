const kafka_consumer = require('./kafka/consumer.js');

async function foo(message){
   // console.log(message.value);
   return;
}
kafka_consumer(foo);
