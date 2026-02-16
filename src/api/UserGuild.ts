import Client from "../Client"
import { formatImgUrl } from "../Utils"


export default class UserGuild {
    client: Client
    id: string
    name: string
    icon: string
    banner: string
    owner: boolean
    features: string[]
    permissions: string
    approximateMemberCount: number|null
    approximatePresenceCount: number|null
    


    constructor(data: any, client: Client) {
        this.client = client

        this.id = data.id
        this.name = data.name
        this.icon = data.icon
        this.banner = data.banner
        this.owner = data.owner
        this.features = data.features
        this.permissions = data.permissions
        this.approximateMemberCount = data?.approximate_member_count || null
        this.approximatePresenceCount = data?.approximate_presence_count || null

        Object.defineProperty(this, "client", {
            value: client,
            enumerable: false,
            writable: false,
        })
    }

    async get() {
        return await this.client.getGuild(this.id) 
    }

    iconUrl(format: string|null = null, size: number|null = null) {
        return formatImgUrl(`https://cdn.discordapp.com/icons/${this.id}/${this.icon}`, format, size)
    }

    bannerUrl(format: string|null = null, size: number|null = null) {
        return formatImgUrl(`https://cdn.discordapp.com/banners/${this.id}/${this.icon}`, format, size)
    }
}