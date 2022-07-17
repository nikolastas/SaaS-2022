/*
File that configures kafka client class
*/
const { Kafka } = require('kafkajs');
const dot = require('dotenv');
dot.config();

let broker = process.env.KAFKA_BROKER;
let m_username = process.env.KAFKA_USERNAME;
let m_password = process.env.KAFKA_PASSWORD;



// Create client instance upon running
// based upon confluent instructions
const kafka = new Kafka({
    clientID: 'input_agrt',
    // set it to desired confluent host
    brokers: [broker],
    ssl: true,
    sasl: {
        mechanism: 'plain', // scram-sha-256 or scram-sha-512
        username: m_username,
        password: m_password
    }
});

module.exports = kafka;