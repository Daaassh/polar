import { GuildMessages } from "database/types/GuildMessagesType.js";



export interface AutoMessages {
    guildId: string;
    messages: GuildMessages[];
}