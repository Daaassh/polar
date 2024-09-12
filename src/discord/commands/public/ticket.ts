import { Command } from "#base";
import { createEmbed, createRow } from "@magicyan/discord";
import { ApplicationCommandType, StringSelectMenuBuilder } from "discord.js";
import { getEmojis } from "#functions";

new Command({
    name: "ticket",
    description: "[ Staff ] Enviar painel de ticket",
    type: ApplicationCommandType.ChatInput,
    dmPermission: false,
    defaultMemberPermissions: "ManageChannels",
    async run(interaction) {
        const emojis = await(await getEmojis(interaction.client))
        const embed = createEmbed({
            description: "Tenha um chat exclusivo com um de nossos membros da equipe para resolver suas\ndúvidas ou outros. Para abrir um atendimento, basta selecionar a categoria que\ndeseja e um membro de nossa equipe o ajudará.\n\n**Ferramentas disponíveis:**\n➟ Suporte Geral;\n➟ Financeiro;\n➟ Parceria;\n➟ Bugs;\n➟ Revisões;\n\n" + "`" + "O mau uso deste canal resultará em uma punição."+"`",
            author: {
                name: "Atendimento Rede Lufy",
                iconURL: interaction.client.user.avatarURL()!
            },
            color: "Orange"
        })
        const row = createRow(
            new StringSelectMenuBuilder({
                customId: "ticket/select",
                placeholder: "Escolha uma categoria",
                options: [
                    {
                        label: "Suporte Geral",
                        value: "suporte",
                        description: "Suporte Geral",
                        emoji: emojis.suport
                    },
                    {
                        label: "Financeiro",
                        value: "financeiro",
                        description: "Financeiro",
                        emoji: "💰"
                    },
                    {
                        label: "Parceria",
                        value: "parceria",
                        description: "Parceria",
                        emoji: "🎥"
                    },
                    {
                        label: "Bugs",
                        value: "bugs",
                        description: "Bugs",
                        emoji: "👾"
                    },
                    {
                        label: "Revisões",
                        value: "revisoes",
                        description: "Revisões",
                        emoji: "🕵️"
                    }
                ]
            })
        )
        await interaction.reply({ embeds: [embed], components: [row] })
    },
})