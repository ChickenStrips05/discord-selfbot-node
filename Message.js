const Member = require("./Member")
const User = require("./user")

class Message {
    constructor (data) {
        this._messsage_object = data

        this.type = data.type
        this.id = data.id
        this.timestamp = data.timestamp
        this.editedTimestamp = data.edited_timestamp
        this.content = data.content
        this.embeds = data.embeds
        this.flags = data.flags
        this.mentions = data.mentions
        this.mentionRoles = data.mention_roles
        this.nonce = data.nonce
        this.attachments = data.attachments
        this.tts = data.tts
        this.pinned = data.pinned

        this.channelType = data.channel_type
        this.channelId = data.channel_id

        this.member = data?.member ? new Member(data.member) : null

        this.authorId = data.author.id
        this.author = new User(data.author)
    }

    delete() {
    }
}

module.exports = Message