import { Command, Modal } from "#base";
import { createEmbed, createModalInput } from "@magicyan/discord";
import { ApplicationCommandType, ModalBuilder, TextInputStyle } from "discord.js";

new Command({
    name: "embed",
    description: "Utilize esse comando para abrir o painel de embeds",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: "ManageMessages",
    dmPermission: false,
    run: async (interaction) => {
        const modal = new ModalBuilder({
            customId: "embed_create/modal",
            title: "Criar Embed",
            components: [
                createModalInput({
                    customId: "embed_create/modal/title",
                    label: "Título",
                    style: TextInputStyle.Short,
                    required: true,
                }),
                createModalInput({
                    customId: "embed_create/modal/description",
                    label: "Descrição",
                    style: TextInputStyle.Paragraph,
                    required: true,
                }),
                createModalInput({
                    customId: "embed_create/modal/image",
                    label: "Imagem",
                    style: TextInputStyle.Short,
                    required: false,
                }),
                createModalInput({
                    customId: "embed_create/modal/thumbmail",
                    label: "Thumbmail",
                    style: TextInputStyle.Short,
                    required: false,
                })
            ]
        })
        await interaction.showModal(modal)
    }
})
new Modal({
    customId: "embed_create/modal",
    run: async (interaction) => {
        const embed = createEmbed({
            title: interaction.fields.getTextInputValue("embed_create/modal/title"),
            description: interaction.fields.getTextInputValue("embed_create/modal/description"),
	        color: "Orange",
        })
        if (!(interaction.fields.getTextInputValue("embed_create/modal/image")) == null) {
            embed.setImage(interaction.fields.getTextInputValue("embed_create/modal/image"))
        }
        if (!(interaction.fields.getTextInputValue("embed_create/modal/thumbmail")) == null) {
            embed.setThumbnail(interaction.fields.getTextInputValue("embed_create/modal/thumbmail"))
        }
        
        await interaction.reply({ embeds: [embed]})
    }
})