import { Command } from "#base";
import { getEmojis } from "#functions";
import { createEmbed, createRow } from "@magicyan/discord";
import { ApplicationCommandType, ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";

new Command({
    name: "automessage",
    description: "Utilize esse comando para abrir o painel de automensagens",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: "ManageMessages",
    dmPermission: false,
    run: async (interaction) => {
        const emojis = await getEmojis(interaction.client)
        const embed = createEmbed({
            title: `${emojis.message} | Painel`,
            description: "# Painel de automensagens\n## Aqui você podera criar automensagens para o servidor\n**Caso o usuario digite tal mensagem em um chat do dc**\n> O Bot ira responder para ela com a configuração que você criou\n> Para criar uma nova configuração clique no botão abaixo\n**Placeholders disponiveis**: \n> **__[user]:__** Menciona o usuario",
            color: "Green"
        })
        const row = createRow(
          new ButtonBuilder({
            custom_id: "automessage/button",
            style: ButtonStyle.Success,
            label: "Nova Configuração",
            type: ComponentType.Button
          }),
          new ButtonBuilder({
            custom_id: "automessage/edit",
            style: ButtonStyle.Danger,
            label: "Editar Configurações",
            type: ComponentType.Button
          })  
        )
        await interaction.reply({ embeds: [embed], components: [row], ephemeral })
    }
})