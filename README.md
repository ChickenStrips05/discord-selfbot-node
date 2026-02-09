## Simple Discord selfbot built in node js
Note: this code is not official nor does it follow the Discord Terms of Service. Use at your own risk and beware of your account being moderated or flagged.

The data structures are inspired by discord.js module.

This is not an NPM module. You can clone the GitHub repo and modify index.js to make your own selfbot.

This code requires the `ws` module to connect to Discord's WebSocket gateway and `dotenv` to parse the .env config.
Install them using `npm install`

### Use

```javascript
// Simple Ping/Pong command
const Client = require("./Client")
require("dotenv").config({quiet: true})

const channelId = "" // the Discord channel id to listen to. (guilds/dms)

const client = new Client(process.env.CLIENT_TOKEN) // this will use your discord user token, NOT A BOT TOKEN

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
```