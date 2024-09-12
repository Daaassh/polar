import { Component } from "#base";
import { createModalInput } from "@magicyan/discord";
import { ComponentType, ModalBuilder, TextInputStyle } from "discord.js";

new Component({
    type: ComponentType.Button,
    customId: "automessage/button",
    run: async (interaction) => {
        const modal = new ModalBuilder({
            title: "Configuração de Automensagens",
            customId: "automessage/config",
            components: [
                createModalInput({
                    customId: "automessage/config/message",
                    label: "Mensagem",
                    placeholder: "Mensagem que o usuario sera respondido",
                    style: TextInputStyle.Short,
                    required: true,
                    value: "oi"
                }),
                createModalInput({
                    customId: "automessage/config/reply",
                    label: "Mensagem respondida",
                    placeholder: "Mensagem que sera respondida pelo bot",
                    style: TextInputStyle.Short,
                    required: true,
                    value: "Ola [user] seja bem vindo ao servidor"
                })
            ]
        })
        await interaction.showModal(modal)
    },
})