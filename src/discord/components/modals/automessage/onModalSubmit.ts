import { Modal } from "#base";
import { db } from "#database";
import { formatPlaceHolders } from "#functions";
import { createEmbed } from "@magicyan/discord";
import { GuildMessages } from "database/types/GuildMessagesType.js";


new Modal({
    customId: "automessage/config",
    isFromMessage: true,
    run: async (interaction) => {
        if (!interaction.guildId) {
            await interaction.reply({
                content: "Ocorreu um erro ao encontrar o servidor.",
            })
            return
        };
        const auto_messages_data = await db.messages.get(interaction.guildId);
        const message = interaction.fields.getTextInputValue("automessage/config/message");
        const reply = interaction.fields.getTextInputValue("automessage/config/reply");
        const existingMessages = auto_messages_data?.messages || [];
        const newMessage: GuildMessages = {
            message: message,
            message_on_send: reply,
        };
        const updatedMessages = [...existingMessages, newMessage];

        await db.messages.set(interaction.guildId!, {
            messages: updatedMessages
        });
        
        const embed = createEmbed({
            title: "Sucesso",
            description: "Parabens\nAgora caso um jogador digite `" + message + "` no chat do servidor o bot ira responder com \n`" + formatPlaceHolders(reply,interaction.user) + "`",
        })
        await interaction.reply({embeds: [embed], ephemeral})
    },
})