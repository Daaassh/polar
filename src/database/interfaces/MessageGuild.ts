import { MessageGuildEmbed } from "../types/MessageGuildEmbed.js"

export interface MessageGuild {
    guild_id: string,
    embeds: {
        ban?: MessageGuildEmbed,
        mute?: MessageGuildEmbed,
        warn?: MessageGuildEmbed,
        tempmute?: MessageGuildEmbed,
        tempban?: MessageGuildEmbed,
        tempwarn?: MessageGuildEmbed
    }
    
}