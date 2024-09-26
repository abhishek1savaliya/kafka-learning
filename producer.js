const { kafka } = require('./client')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


const init = async () => {
    const producer = kafka.producer()

    console.log("Connecting Producer");
    await producer.connect();
    console.log("Producer connected successfully");

    rl.setPrompt('> ')
    rl.prompt();

    rl.on('line', async (line) => {
        const [riderName, location] = line.split(' ')

        await producer.send({
            topic: 'rider-updates',
            messages: [
                {
                    partition: location.toLowerCase() === 'north' ? 0 : 1, key: 'location-updates', value: JSON.stringify({ name: riderName, location: location })
                }
            ]
        })

    }).on('close', async () => {
        await producer.disconnect()
    })
}

init()