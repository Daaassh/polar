import { Component } from "#base";
import { db } from "#database";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ComponentType, ButtonStyle, time } from "discord.js";

new Component({
    customId: "sugerir/aceitar",
    type: ComponentType.Button,
    async run(interaction) {
        const data = await db.button_data.get(interaction.message.id)
        const clickedMembers = Array.from(data?.clickeds?.members || []);
        const clickedMember = clickedMembers.find(members => members.user_id == interaction.user.id);
        if (!clickedMember || !clickedMember.user_id) {
            if (interaction.isButton()) {
                const button = interaction.component;
                const currentLabel = button.label;
                const number_of_accepts = Number(currentLabel!.split("(")[1].split(")")[0]);
                const newLabel = `Aceitar (${number_of_accepts + 1})`;
                const label = newLabel
    
                const row = createRow(
                    new ButtonBuilder({custom_id: "sugerir/aceitar", label: label, style: ButtonStyle.Success}),
                    new ButtonBuilder({custom_id: data?.delete.custom_id, label: data?.delete.label, style: ButtonStyle.Danger})
                )
                const newMember = {
                    user_id: interaction.user.id,
                    escolha: "Aceito",
                    last_date: new Date().toISOString(),
                };
                
                const updatedMembers = [newMember, ...data?.clickeds?.members || []];
    
                await db.button_data.set(interaction.message.id, {
                    accept: {
                        custom_id: "sugerir/aceitar",
                        label: label
                    },
                    message_id: interaction.message.id,
                    delete: {
                        custom_id: data?.delete.custom_id,
                        label: data?.delete.label
                    },
                    clickeds: {
                        members: updatedMembers
                    }
                })
                
    
                await interaction.update({ components: [row] });
                return;
            }            
        }
        else  {
            await interaction.reply({content: "Você já escolheu " + "`" + clickedMember!.escolha + "`" + ` ha ${time(new Date(clickedMember!.last_date!), "R")}`, ephemeral})
            return
        }
    },
});
