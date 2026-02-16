import Client from "../Client"
import { EmojiUpdate } from "../Types"
import User from "./User"

export default class Emoji {
    client: Client
    guildId: string

    id: string
    name: string
    roles?: string[]
    user?: User | null
    requireColons?: boolean
    managed?: boolean
    animated?: boolean
    available?: boolean

    constructor (data: any, client: Client, guildId: string) {
        this.client = client
        this.guildId = guildId
        
        this.id = data.id
        this.name = data.name
        this.roles = data?.roles || null
        this.user = data?.user ? new User(data.user, client) : null
        this.requireColons = data?.require_colons || null
        this.managed = data?.managed || null
        this.animated = data?.animated || null
        this.available = data?.available || null

        Object.defineProperty(this, "client", {
            value: client,
            enumerable: false,
            writable: false,
        })
    }

    async update(options: EmojiUpdate): Promise<Emoji|never> {
            const newEmoji = await this.client.updateEmoji(this.guildId, this.id, options)
            Object.assign(this, newEmoji)
            return this
    }
    
    async delete(): Promise<true|never> {
        return await this.client.deleteEmoji(this.guildId, this.id)
    }
}