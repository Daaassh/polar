import { Component } from "#base";
import { db } from "#database";
import { createEmbed, createRow, findChannel } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";
import { createTicketChannel } from "#functions";

new Component({
    customId: "ticket/select",
    type: ComponentType.StringSelect,
    async run(interaction) {
        const user_data = await db.members.get(interaction.user.id)
        const tickets_infos = await db.infos.get(interaction.guildId!)
        if (!(tickets_infos)) {
            await db.infos.set(interaction.guildId!, { abertos: 0, atendidos: 0 })
        }
        if (!(user_data)) {
            const selected = interaction.values[0]
            const channel = await createTicketChannel(interaction,"1232839097551425577", selected)
            const embed = createEmbed({
                title: `Ticket | ${selected.charAt(0).toUpperCase() + selected.slice(1)}`,
                description: `Um novo ticket foi aberto pelo usuario: ${interaction.user}`
            })
            await interaction.reply({content: `Seu ticket foi aberto em: ${channel}`, ephemeral: true})
            await db.members.set(interaction.user.id, { channel_id: channel?.id!,userid: interaction.user.id })
            await db.tickets.set(channel?.id!, {
                ticket: {
                    atended: false,
                    channel_id: channel?.id!,
                    user_id: interaction.user.id
                }
            })
            const infos = await db.infos.get(interaction.guildId!)
            await db.infos.set(interaction.guildId!, { abertos: infos!.abertos + 1, atendidos: infos!.atendidos })
            const row = createRow(
                new ButtonBuilder({ customId: "ticket-button-close-ticket", label: "Fechar Ticket", emoji: "❌",style: ButtonStyle.Danger }),
                new ButtonBuilder({ customId: "ticket-button-transcript", label: "Transcript", emoji: "📑", style: ButtonStyle.Primary}),
            );
            await channel?.send({ embeds: [embed], content: "||@everyone||", components: [row] }) 
        }
        else {
            const embed = createEmbed({
                description: `Você ja tem um ticket aberto\n> ${findChannel(interaction.guild!).byId(user_data.channel_id)}`,
                color: "Red"
            })
            await interaction.reply({embeds: [embed], ephemeral: true})
        }
    },
})