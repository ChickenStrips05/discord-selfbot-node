const Client = require("./Client")
require("dotenv").config({quiet: true})

const channelId = ""

const client = new Client(process.env.CLIENT_TOKEN)

client.once("READY", async () => {
    console.log(`Logged in as: ${client.globalName} (${client.id})`)
})

client.on("MESSAGE_CREATE", async (message) => {
    if (message.channelId === channelId) {
        if (message.content === "ping") {
            // reply with pong
            await client.sendMessage(message.channelId, "Pong!")
        }
    }
})