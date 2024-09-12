import { Component } from "#base";
import { db } from "#database";
import { createEmbed, createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";
import { getEmojis } from "#functions";

new Component({
    type: ComponentType.StringSelect,
    customId: "automessage/edit",
    run: async (interaction) => {
        const selected = interaction.values[0];
        const emojis = await getEmojis(interaction.client);
        const get_dados = await db.messages.get(interaction.guildId!);
        get_dados?.messages.filter((message) => message.message === selected).map((message) => {
            const embed = createEmbed({
                title: `${emojis.config} | Configurações`,
                description: "Abaixo você pode clicar no botão doque deseja fazer\nAo clicar no botão editar você ira conseguir editar as mensagens\nCaso clique no deletar automaticamente a mensagem sera deletada\n> **Mensagem que e inserida:**\n" + "```" + message.message_on_send + "```",
                color: "Red",
                timestamp: new Date()
            })
            const row = createRow(
                new ButtonBuilder({
                    custom_id: `automessage/edit/button/${message.message.toLowerCase()}`,
                    label: "Editar Mensagem",
                    style: ButtonStyle.Success,
                    type: ComponentType.Button,
                }),
                new ButtonBuilder({
                    custom_id: `automessage/delete/button/${message.message.toLowerCase()}`,
                    label: "Excluir Mensagem",
                    style: ButtonStyle.Danger,
                    type: ComponentType.Button,
                })
            )
            interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
        })
    },
})

