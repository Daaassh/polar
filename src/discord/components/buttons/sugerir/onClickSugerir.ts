import { Component } from "#base";
import { createModalInput } from "@magicyan/discord";
import { ComponentType, ModalBuilder, TextInputStyle } from "discord.js";

new Component({
    customId: "sugerir/button",
    type: ComponentType.Button,
    async run(interaction) {
        const modal = new ModalBuilder({
            customId: "sugerir/modal",
            title: "Envie sua sugestão!",
            components: [
                createModalInput({
                    customId: "sugerir/modal/nickname",
                    label: "Seu nickname",
                    required: true,
                    maxLength: 24,
                    style: TextInputStyle.Short
                }),
                createModalInput({
                    customId: "sugerir/modal/server",
                    label: "Servidor para sugestão",
                    required: true,
                    maxLength: 50,
                    style: TextInputStyle.Short
                }),
                createModalInput({
                    customId: "sugerir/modal/sugestao",
                    label: "Sua sugestão",
                    required: true,
                    maxLength: 2000,
                    style: TextInputStyle.Short
                }),
                createModalInput({
                    customId: "sugerir/modal/aceitar",
                    label: "Por que devemos aceitar?",
                    required: true,
                    maxLength: 1000,
                    style: TextInputStyle.Short
                }),
            ]
        })
        await interaction.showModal(modal)
    }
})