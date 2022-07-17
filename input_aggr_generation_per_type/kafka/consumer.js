const kafka_client = require('./kafka.js');

//if group id doesnt exist, throws some erorrs but then works just fine
const consumer = kafka_client.consumer({ groupId: "agrt" })

const simple_consume = async (somethingToDo ) => {
	// first, we wait for the client to connect and subscribe to the given topic
    console.log("running simple consume");
	await consumer.connect()
    // change kafka topic
	await consumer.subscribe({ topic: "data_input_aggr", fromBeginning: true  }) //TODO: change it later to variable
	await consumer.run({
		// when new message in client
		eachMessage: async  ({ message }) => {
            somethingToDo(message);
			// here, we just log the message to the standard output
			// main code in here, the consumer needs to always run
			console.log(`received message: ${message.value}`)
		},
	})
}

// enable line to be exported but we use it as is this time
module.exports = simple_consume;

// simple_consume().catch((err) => {
    
//     console.error("error in producer: ", err)
// });