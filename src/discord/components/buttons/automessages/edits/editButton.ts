import { Component, Modal } from "#base";
import { db } from "#database";
import { createEmbed, createModalInput } from "@magicyan/discord";
import { ComponentType, ModalBuilder, TextInputStyle } from "discord.js";

new Component({
    customId: "automessage/edit/button/:message:",
    type: ComponentType.Button,
    run: async(interaction, {"message:": messages}) => {
        const get_dados = await db.messages.get(interaction.guildId!);
        const messageToEdit = get_dados?.messages.find((msg) => msg.message === messages);
        if (!messageToEdit) {
            const embed = createEmbed({
                title: "❌ | Mensagem não encontrada",
                description: "Não foi encontrada nenhuma mensagem com o valor especificado.",
                color: "Red"
            });
            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }
    
        const modal = new ModalBuilder({
            title: "Configuração de Automensagens",
            custom_id: "automessage/config/edit/modal",
            components: [
                createModalInput({
                    customId: "automessage/config/message",
                    label: "Mensagem",
                    placeholder: "Mensagem que o usuario sera respondido",
                    style: TextInputStyle.Short,
                    required: true,
                    value: messageToEdit?.message
                }),
                createModalInput({
                    customId: "automessage/config/reply",
                    label: "Mensagem respondida",
                    placeholder: "Mensagem que sera respondida pelo bot",
                    style: TextInputStyle.Short,
                    required: true,
                    value: messageToEdit?.message_on_send
                    })
                ]
            })
        await interaction.showModal(modal) 

    },

})

new Modal({
    customId: "automessage/config/edit/modal",
    run: async (interaction) => {
        const message = interaction.fields.getTextInputValue("automessage/config/message");
        const reply = interaction.fields.getTextInputValue("automessage/config/reply");

        await db.messages.set(interaction.guildId!, {
            guildId: interaction.guildId!,
            messages: [{
                message: message,
                message_on_send: reply
            }]
        })

        const embed = createEmbed({
            title: "✅ | Editado com sucesso",
            description: "A mensagem foi editada com sucesso",
            color: "Green"
        })
        await interaction.reply({ embeds: [embed], ephemeral })
    },
})