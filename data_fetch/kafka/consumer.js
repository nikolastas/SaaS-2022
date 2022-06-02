const {Kafka, Partitioners} = require("kafkajs");

const kafka = new Kafka({
    clientId: 'lol',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({groupId: 'test-topic'})


const listen = async () => {

    await consumer.connect()
    await consumer.subscribe({topic: 'test', fromBeginning: true})

    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log({
                value: message.value.toString(),
            })
        }
    })
}

listen().then(() => {console.log("bobby")})