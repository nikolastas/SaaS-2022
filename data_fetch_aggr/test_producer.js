const kafka_client = require('./kafka.js');

const producer = kafka_client.producer({allowAutoTopicCreation: false});

const produce_string = async (my_topic, message, key) => {
    await producer.connect()
    try {
        // send a message to the configured topic with the given key
        await producer.send({
            topic: my_topic,
            messages: [
                {
                    key: String(key),
                    value: message,
                },
            ],
        })

        // if the message is written successfully, log it in console
        //TODO: may remove later
        console.log("Kafka writes: ", message)
    } catch (err) {
        console.error("could not write message " + err)
    }
}
produce_string("data_modify_physical", "DATA READY", 1);