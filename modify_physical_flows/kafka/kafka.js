/*
File that configures kafka client class
*/
const { Kafka } = require('kafkajs');
const dot = require('dotenv');
dot.config();

const m_username = process.env.KAFKA_USERNAME;
const m_password = process.env.KAFKA_PASSWORD;
let broker = process.env.KAFKA_BROKER;

// Create client instance upon running
// based upon confluent instructions
const kafka = new Kafka({
    clientID: 'modify_ff',
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