
import { createEmbed } from "@magicyan/discord";
import { ComponentType } from "discord.js";
import { ExportReturnType, createTranscript as discordTranscripts } from "discord-html-transcripts";
import { Component } from "#base";

new Component({
  customId: "ticket-button-transcript",
  type: ComponentType.Button, cache: "cached",
  async run(interaction) {
    if (!interaction.memberPermissions.has("Administrator")) {
      const embed = createEmbed({
        title: `Tickets`,
        description: `Você não tem permissão para pegar o transcript!`,
        color: "Red"
      })
      await interaction.reply({ embeds: [embed], ephemeral: true })
      return
    }

    const attachment = await discordTranscripts(interaction.channel!, {
      limit: -1, 
      returnType: ExportReturnType.Attachment, 
      filename: 'transcript.html', 
      saveImages: false, 
      footerText: "Foram exportadas {number} mensagen{s}", 
      poweredBy: false,
  });
    const embed = createEmbed({
      title: `Tickets`,
      description: `Transcript do canal: ${interaction.channel}.`,
      color: "Red"
    })
    await interaction.reply({ files: [attachment], ephemeral})
    await interaction.user.send({ embeds: [embed], files: [attachment] })
  },
});