const { formatImgUrl } = require("./Utils")

class User {
    constructor (data) {
        this._user_object = data

        this.id = data.id
        this.username = data.username
        this.globalName = (data.global_name !== null) ? data.global_name : data.username
        this.discriminator = data.discriminator
        this.avatar = data.avatar
        this.clan = data.clan
    }

    avatarUrl(format = null, size = null) {
        return formatImgUrl(`https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}`, format, size)
    }
}

module.exports = User