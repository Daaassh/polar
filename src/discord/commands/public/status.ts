import { Command } from "#base";
import { getEmojis } from "#functions";
import { createEmbed } from "@magicyan/discord";
import { ApplicationCommandType } from "discord.js";
import mc from "minecraftstatuspinger"

new Command({
    name: "status",
    description: "Utilize para mostrar o status do servidor",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    run: async (interaction) => {
        const emojis = await getEmojis(interaction.client)
        const result = await mc.lookup({ host: "redelufy.com", port: 31558});
        
        const embed = createEmbed({
            title: `${emojis.minecraft} | Informações do servidor`,
            description: `> **Ip de conexão: **` + "`" + "redelufy.com" + "`"+"\n> **Online: **" + "`" + result.status!.players.online + "/" + result.status!.players.max + "`",
            image: {
                description: "Banner do servidor",
                width: 512,
                url: result.status!.banner
            }
        })
        await interaction.reply({ embeds: [embed] })           
    }
})