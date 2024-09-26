const { kafka } = require('./client')
const group = process.argv[2]

const init = async () => {
    const consumer = kafka.consumer({
        groupId: group
    })

    await consumer.connect()

    await consumer.subscribe({ topics: ['rider-updates'], fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`${group}: [${topic}]: PART: ${partition}`, message.value.toString())
        }
    })

    // await consumer.disconnect()
}

init()