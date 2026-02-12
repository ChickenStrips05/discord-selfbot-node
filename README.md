## Simple Discord selfbot made with TypeScript
> [!WARNING]
> This code is not official nor does it follow the Discord Terms of Service. Use at your own risk and beware of your account being moderated or flagged.
> I am not responsible for any blocked accounts because of this code.

The data structures are inspired by discord.js module.
Huge thanks to the [Discord Userdoccers](https://github.com/discord-userdoccers) for reverse-engineering and creating some data structures that I used, [website](https://docs.discord.food/).

This is not an NPM module. You can clone the GitHub repo and modify index.ts to make your own selfbot.

This code uses the `dotenv` module to parse the .env config, however it is not required.

You can run this code with any TypeScript runner, I use `tsx`

### To run:
```bash
npm install tsx@latest
npx tsx index.ts
```
### Example code

```typescript
// Simple ping/pong command thing
import Client from "./Client"
import { config } from "dotenv"
import { Message } from "./Message"
config({ quiet: true })

const client = new Client(process.env.CLIENT_TOKEN!)

const guildId = "" // guild id to listen for messages

client.once("READY", async () => {
    console.log(`Logged in as ${client.globalName}`)

    // await client.updateGuildSubscriptions({[guildId]: {activities: true, typing: true, threads: true}}) 
    
    // this will make Discord send all message events from this guild to the client.
    // All dm events will still be sent without this
    // if not included, Discord may not send events to the client unless it has been recently active in that guild.
})

client.on("MESSAGE_CREATE", async (message: Message) => {
    if (message.content?.toLowerCase() === "ping" && message.author.id !== client.id) {
        await message.reply("Pong!")
    } 
})
```