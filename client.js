const { Kafka } = require("kafkajs");

exports.kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['10.13.4.152:9092'],
})
