const {Kafka, Partitioners} = require("kafkajs");
const kafka = new Kafka({
    clientId: 'lol',
    brokers: ['localhost:9092'],
});
const producer = kafka.producer({createPartitioner: Partitioners.LegacyPartitioner})


const run = async () => {
    let i = 4;
    await producer.connect()
    while (i < 4) {
        await producer.send({
            topic: 'test',
            messages: [
                {value: i}
            ]
        })
        i++;
    }
    // await producer.disconnect()
}

run().then(() => {
    console.log("bob")
})

// await producer.disconnect()