const ws = require("ws")
const EventEmitter = require("./EventEmitter")
const Message = require("./Message")

class Client {
    connected = false
    
    constructor (token) {
        this.eventEmitter = new EventEmitter()
        
        this.on = this.eventEmitter.on
        this.once = this.eventEmitter.once
        this.off = this.eventEmitter.off
        this.addListener = this.eventEmitter.addListener
        this.removeAllListeners = this.eventEmitter.removeAllListeners

        this.token = token
        this.ws_connection = new ws("wss://gateway.discord.gg/?encoding=json&v=9", {})
        this.ws_connection.on("open", () => {
            this.ws_connection.send(JSON.stringify({"op":2,"d":{"token":token,"capabilities":null,"properties":{},"client_state":{"guild_versions":{}}}}))
        })
        
        this.ws_connection.on("message", (data) => {
            try {
                const json = JSON.parse(data.toString())
                //console.log(json)
                if (json.op === 10) {
                    this.heartbeat_interval = json.d.heartbeat_interval
                    this.connected = true
                    this.eventEmitter.emit("CONNECT", {heartbeat_interval: this.heartbeat_interval})

                    // heartbeat
                    setInterval(() => {
                        this.ws_connection.send(JSON.stringify({op: 1, d: null}))
                        this.eventEmitter.emit("HEARTBEAT_SENT")
                    }, this.heartbeat_interval)
                }
                else if (json.op === 11) {
                    this.eventEmitter.emit("HEARTBEAT_RECIEVED")
                }
                else if (json.op === 0 && json.t === "READY") {
                    this.user_object = json.d.user

                    this.id = this.user_object.id
                    this.username = this.user_object.username
                    this.globalName = this.user_object.global_name
                    this.email = this.user_object.email
                    this.verified = this.user_object.verified
                    this.discriminator = this.user_object.discriminator
                    this.bio = this.user_object.bio
                    this.avatar = this.user_object.avatar
                    this.sessionId = json.d.session_id
                    this.guilds = json.d.guilds
                    this.userSettings = json.d.user_settings

                    this.eventEmitter.emit("READY", this)
                }
                else if (json.op === 0 && json.t === "MESSAGE_CREATE") {
                    this.eventEmitter.emit("MESSAGE_CREATE", new Message(json.d))
                }
                else if (json.op === 0 && json.t === "MESSAGE_UPDATE") {
                    this.eventEmitter.emit("MESSAGE_UPDATE", new Message(json.d))
                }
                else if (json.op === 0 && json.t === "MESSAGE_DELETE") {
                    this.eventEmitter.emit("MESSAGE_DELETE", {id: json.d.id, channelId: json.d.channel_id, guildId: json.d.guild_id})
                }
            } catch(e) {
                console.warn("Error parsing discord WS message:", e)
            }
        })
    }

    avatarUrl(format = null, size = null) {
        return formatImgUrl(`https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}`, format, size)
    }

    async sendMessage(channelId, content, flags = 0, tts = false) {
        const res = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, 
            {
                method: "POST", headers: {"Authorization": this.token, "Content-Type": "application/json"},
                body: JSON.stringify({content: content, flags: flags, tts: tts})
            }
        )
        
        const json = await res.json()

        if (!res.ok) {
            console.error("Error sending message: ")
            console.log(json)    
            return json
        }

        return new Message(json)
    }

    async sendTypingIndicator(channelId) {
        const res = await fetch(`https://discord.com/api/v9/channels/${channelId}/typing`, 
            {
                method: "POST", headers: {"Authorization": this.token, "Content-Type": "application/json"},
            }
        )

        if (!res.ok) {
            const json = await res.json()
            console.error("Error sending typing indicator: ")
            console.log(json)    
            return json
        }
    }

    async deleteMessage(channelId, id) {
        const res = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages/${id}`, 
            {
                method: "DELETE", headers: {"Authorization": this.token, "Content-Type": "application/json"},
            }
        )

        if (!res.ok) {
            const json = await res.json()
            console.error("Error deleteing message: ")
            console.log(json)    
            return json
        }
    }

    async updateMessage(channelId, id, content) {
        const res = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages/${id}`, 
            {
                method: "PATCH", headers: {"Authorization": this.token, "Content-Type": "application/json"},
                body: JSON.stringify({content: content})
            }
        )
        
        const json = await res.json()

        if (!res.ok) {
            console.error("Error updating message: ")
            console.log(json)    
            return json
        }

        return new Message(json)
    }

    
}

module.exports = Client