import { Component } from "#base";
import { db } from "#database";
import { createEmbed } from "@magicyan/discord";
import { ComponentType } from "discord.js";

new Component({
    customId: "automessage/delete/button/:message:",
    type: ComponentType.Button,
    run: async (interaction, { "message:": message }) => {
        const get_dados = await db.messages.get(interaction.guildId!);
        const messageToDelete = get_dados?.messages.find((msg) => msg.message === message);
    
        if (messageToDelete) {
            await interaction.reply({content: "Em Desenvolvimento 🚧", ephemeral: true});
            return
            await db.messages.pop(messageToDelete!.message);
            const embed = createEmbed({
                title: "✅ | Removido com sucesso",
                description: "A mensagem foi removida com sucesso",
                color: "Green"
            });
            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            const embed = createEmbed({
                title: "❌ | Mensagem não encontrada",
                description: "Não foi encontrada nenhuma mensagem com o valor especificado.",
                color: "Red"
            });
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    
        console.log(await db.messages.get(interaction.guildId!));
    },
})