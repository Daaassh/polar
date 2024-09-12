import { Event } from "#base";
import { db } from "#database";
import { formatPlaceHolders } from "#functions";
import { GuildMessages } from "database/types/GuildMessagesType.js";



new Event({ 
    event: "messageCreate",
    name: "onMessage",
    run: async (messages) => {
        if (messages.author.bot) return;
        const auto_messages_data = await db.messages.get(messages.guildId!);
        const guild_messages: GuildMessages[] = auto_messages_data?.messages || [];
        for (const message of guild_messages) {
            if (message.message.toLowerCase() === messages.content.toLowerCase()) {
                const message_send = formatPlaceHolders(message.message_on_send, messages.author!);
                await messages.reply(message_send);
            }
        }
    },
})
