import Client from "../Client"
import { RoleColors, RoleUpdate } from "../Types"
import { formatImgUrl } from "../Utils"

export default class Role {
    client: Client
    guildId: string

    id: string
    name: string
    description: string|null
    colors: RoleColors
    hoist: boolean
    icon: string
    unicodeEmoji?: string
    position: number
    permissions: string
    managed: boolean
    mentionable: boolean
    flags?: number
    tags?: number

    constructor (data: any, client: Client, guildId: string) {
        this.client = client
        this.guildId = guildId
        
        this.id = data.id
        this.name = data.name
        this.description = data.description || null
        this.colors = data.colors
        this.hoist = data.hoist
        this.icon = data.icon || null
        this.unicodeEmoji = data.unicode_emoji || null
        this.position = data.position
        this.permissions = data.permissions
        this.managed = data.managed
        this.mentionable = data.mentionable
        this.flags = data?.flags || null
        this.tags = data?.tags || null

        Object.defineProperty(this, "client", {
            value: client,
            enumerable: false,
            writable: false,
        })
    }

    async update(options: RoleUpdate): Promise<Role|never> {
        const newRole = await this.client.updateRole(this.guildId, this.id, options)
        Object.assign(this, newRole)
        return this
    }

    async delete(): Promise<true|never> {
        return await this.client.deleteRole(this.guildId, this.id)
    }

    iconUrl(format: string|null = null, size: number|null = null) {
        return formatImgUrl(`https://cdn.discordapp.com/roles/${this.id}/icons/${this.icon}`, format, size)
    }
}