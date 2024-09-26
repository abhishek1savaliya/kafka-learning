const { kafka } = require('./client')

const init = async () => {
    const admin = kafka.admin();

    console.log("admin Connecting")

    admin.connect()

    console.log("Admin Connection Success");

    console.log("creating Topics [Rider Update]")

    await admin.createTopics({
        topics: [{
            topic: 'rider-updates',
            numPartitions: 2,
        }]
    })

    console.log("Topic created success [Rider Update]")

    console.log("Disconnecting Admin")
    await admin.disconnect()
    console.log("Admin Disconnected")
}

init();

