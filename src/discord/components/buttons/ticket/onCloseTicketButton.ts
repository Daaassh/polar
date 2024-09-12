import { Component } from "#base";
import { db } from "#database";
import { createEmbed, findChannel, sleep } from "@magicyan/discord";
import { ComponentType } from "discord.js";

new Component({
    customId: "ticket-button-close-ticket",
    type: ComponentType.Button,
    async run(interaction) {
      const channel = findChannel(interaction.guild!).byId(interaction.channelId)
      const user = interaction.guild?.members.cache.get(channel?.topic!)
      if (!user) {
        await interaction.channel?.send({content: "Usuario não encontrado para enviar a embed de aviso"})
      } 
      if (!interaction.memberPermissions!.has("ManageChannels")) {
            const embed = createEmbed({
              title: `Tickets`,
              description: `Você não tem permissão para fechar tickets!`,
              color: "Red"
            })
            await interaction.reply({ embeds: [embed], ephemeral: true })
            return
          }

        const embed = createEmbed({
            title: "Ticket",
            description: "**O ticket sera deletado em 5 segundos.**",
            color: "Red",
        })
        const embed_for_user = createEmbed({
          title: "❌ | Tickets",
          description: `**Seu ticket foi fechado.**\n> No servidor: **${interaction.guild}**\nPelo staff: ${interaction.user}`,
          color: "Red"
        })
        await user!.send({embeds: [embed_for_user]})
        await db.members.delete(user?.id!)
        const info = await db.infos.get(interaction.guildId!)
        await db.infos.set(interaction.guildId!, { abertos: info!.abertos - 1, atendidos: info!.atendidos})
        await db.tickets.delete(interaction.channelId)
        await interaction.reply({ embeds: [embed]})
        await sleep(5000)
        await interaction.channel?.delete()
    }
})