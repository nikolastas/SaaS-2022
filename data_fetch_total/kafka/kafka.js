/*
File that configures kafka client class
*/
const {Kafka} = require('kafkajs');

// an ta peirajete epikoinwnhste me tsaka na sas gamhsei to spiti
const m_username = 'EP3SP67RGDXP57IK'
const m_password = 'aTLGhy8a1/lYhe9GX71oEps9U6HzHfn29x2Pfy2bRvmNUGZP2pvQ9IP6gf1bfHdH'

// Create client instance upon running
// based upon confluent instructions
const kafka = new Kafka({
    clientID: 'fetch_atl',
    // set it to desired confluent host
    brokers: ['pkc-41mxj.uksouth.azure.confluent.cloud:9092'],
    ssl: true,
    sasl: {
        mechanism: 'plain', // scram-sha-256 or scram-sha-512
        username: m_username,
        password: m_password
    }
});

module.exports = kafka;