import { Command } from "#base";
import { createEmbed, createRow } from "@magicyan/discord";
import { ApplicationCommandType, ButtonBuilder, ButtonStyle } from "discord.js";

new Command({
    name: "sugerir",
    description: "[ Staff ] Enviar painel de sugestões",
    type: ApplicationCommandType.ChatInput,
    dmPermission: false,
    defaultMemberPermissions: "ManageChannels",
    async run(interaction) {
        const embed = createEmbed({
            title: "💡 AJUDE O SERVIDOR A MELHORAR!",
            description: "Olá, jogador! Essa sala é destinada ao envio de sugestões para toda a rede, tanto discord quanto servidor.\n\nAo enviar a mensagem, eu entregarei todas sugestões aos superiores e ficarei no pé para elas serem lidas e discutidas.\n\nO mau uso deste canal resultará em uma punição.\n©️ Rede Lufy, 2024.",
            color: "Purple"
        })
        await interaction.reply({content: "Embed enviada", ephemeral})
        const row = createRow(
            new ButtonBuilder({
                custom_id: "sugerir/button",
                label: "💡 Sugerir",
                style: ButtonStyle.Success
            })
        )
        await interaction.channel!.send({ embeds: [embed], components: [row] })
    },
})