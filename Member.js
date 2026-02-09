const { formatImgUrl } = require("./Utils")

class Member {
    constructor (data) {
        this._user_object = data

        this.id = data.id
        this.username = data.username
        
        this.nick = data.nick
        this.roles = data.roles
        this.premiumSince = data.premium_since
        this.pending = data.pending
        this.mute = data.mute
        this.flags = data.flags
        this.deaf = data.deaf
        this.communicationsDisabledUntil = data.communications_disabled_until
        this.joinedAt = data.joined_at
        this.avatar = data.avatar
        this.banner = data.banner
        
    }

    avatarUrl(format = null, size = null) {
        return formatImgUrl(`https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}`, format, size)
    }
}

module.exports = Member