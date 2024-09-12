import { Modal } from "#base";
import { db } from "#database";
import { createEmbed, createRow, findChannel } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

new Modal({
    customId: "sugerir/modal",
    async run(interaction) {
        const user_name = interaction.fields.getTextInputValue("sugerir/modal/nickname")
        const server_name = interaction.fields.getTextInputValue("sugerir/modal/server")
        const sugestao = interaction.fields.getTextInputValue("sugerir/modal/sugestao")
        const aceitar = interaction.fields.getTextInputValue("sugerir/modal/aceitar")
        const channel = await findChannel(interaction.guild!).byId("1231320826587123814")
        const embed = createEmbed({
            description: "**Sugestão de **" + "`" + user_name +"`"+"\n**Servidor destinado **"  + "`" + server_name +"`"+`\n\n**Sugestão:** \n> ${sugestao}`,
            color: "Purple"
        })
        await interaction.reply({content: "Sua sugestão foi enviada", ephemeral})


        const row = createRow(
            new ButtonBuilder({custom_id: "sugerir/aceitar", label: "Aceitar (0)", style: ButtonStyle.Success}),
            new ButtonBuilder({custom_id: "sugerir/negar", label: "Negar (0)", style: ButtonStyle.Danger})
        )
        const message_id = await channel!.send({ embeds: [embed], components: [row] })

        const fullMessage = await message_id.fetch();

        const thread = await fullMessage.startThread({
            name: 'Complemente a sugestão aqui!',
            rateLimitPerUser: 5
        });
        
        const embed_two = createEmbed({
            color: "Orange",
            title: "📓 Dê a sua opinião",
            description: `Esta sugestão foi enviada por ${interaction.user}\nCaso tenha alguma ideia ou algo do tipo envie aqui!\n\n**Por que devemos aceitar: **\n` + "`" + aceitar +"`"
        })
        await thread.send({embeds: [embed_two]})

        await db.button_data.set(message_id.id, {
            accept: {
                custom_id: "sugerir/aceitar",
                label: "Aceitar (0)"
            },
            delete: {
                custom_id: "sugerir/negar",
                label: "Negar (0)"
            },
            message_id: message_id.id!,
            clickeds: {
                members: [
                    {
                        escolha: "Abu",
                        last_date: new Date().toISOString(),
                        user_id: interaction.client.user.id
                    }   
                ]
            }
        })
    },
    
})