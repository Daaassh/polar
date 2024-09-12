import { Component } from "#base";
import { db } from "#database";
import { formatPlaceHolders, getEmojis } from "#functions";
import { createEmbed, createRow, randomNumber } from "@magicyan/discord";
import { GuildMessages } from "database/types/GuildMessagesType.js";
import { ComponentType, SelectMenuComponentOptionData, StringSelectMenuBuilder } from "discord.js";

new Component({
    type: ComponentType.Button,
    customId: "automessage/edit",
    run: async (interaction) => {
        const emojis = await getEmojis(interaction.client);
        const embed = createEmbed({
            title: `${emojis.config} | Configurações`,
            description: "Abaixo estarão todas as auto mensagens já criadas. Selecione a qual você deseja editar/excluir",
            color: "Red"
        });
        const row = createRow(
            new StringSelectMenuBuilder({
                customId: "automessage/edit",
                options: await getOptionsFromDatabase(interaction),
                placeholder: "Selecione uma opção",
                minValues: 1,
                maxValues: 1,
            })
        );
        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    
    },
})
function randomEmojis(): string {
    const list_of_emojis = ["👀", "✨", "🎇","✨","🎉", "🎊", "🎁","🧵","🎟"]
    const random_number = randomNumber(0,list_of_emojis.length - 1);
    return list_of_emojis[random_number];
}
async function getOptionsFromDatabase(interaction: any): Promise<SelectMenuComponentOptionData[]> {
    const auto_messages_data = await db.messages.get(interaction.guildId!);
    const guild_messages: GuildMessages[] = auto_messages_data?.messages || [];
    const options = guild_messages.map((message) => ({
        label: message.message.charAt(0).toUpperCase() + message.message.slice(1),
        value: message.message.toLowerCase(),
        description: formatPlaceHolders(message.message_on_send,interaction).replaceAll("**", "").replaceAll("__", ""),
        emoji: randomEmojis()
    }));

    return options;
}