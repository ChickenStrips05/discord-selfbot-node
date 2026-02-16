import Client from "../Client"
import { EmojiUpdate, StickerUpdate } from "../Types"
import User from "./User"

export default class Sticker {
    client: Client
    guildId: string

    id: string
    packId?: string
    name: string
    description: string
    tags: string
    type: number
    formatType: number
    available?: boolean
    user?: User | null
    sortValue: number

    constructor(data: any, client: Client) {
        this.client = client

        this.id = data.id
        this.packId = data?.pack_id || null
        this.name = data.name
        this.description = data?.description || null
        this.tags = data.tags
        this.type = data.type
        this.formatType = data.format_type
        this.available = data?.available || null
        this.guildId = data?.guild_id || null
        this.user = data?.user ? new User(data.user, client) : null
        this.sortValue = data?.sort_value || null
        Object.defineProperty(this, "client", {
            value: client,
            enumerable: false,
            writable: false,
        })
    }

    async update(options: StickerUpdate): Promise<Sticker | never> {
        const newSticker = await this.client.updateSticker(this.guildId, this.id, options)
        Object.assign(this, newSticker)
        return this
    }

    async delete(): Promise<true | never> {
        return await this.client.deleteSticker(this.guildId, this.id)
    }
}