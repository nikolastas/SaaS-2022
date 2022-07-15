/*
File that configures kafka client class
*/
const { Kafka } = require('kafkajs');
const dot = require("dotenv");
dot.config();

const broker = process.env.KAFKA_BROKER;
const m_username = process.env.KAFKA_USERNAME;
const m_password = process.env.KAFKA_PASSWORD;

// Create client instance upon running
// based upon confluent instructions
const kafka = new Kafka({
    clientID: 'input_ff',
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