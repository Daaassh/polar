import { Component } from "#base";
import { db } from "#database";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ComponentType, ButtonInteraction, ButtonStyle, time } from "discord.js";

new Component({
    customId: "sugerir/negar",
    type: ComponentType.Button,
    async run(interaction: ButtonInteraction) {
        const data = await db.button_data.get(interaction.message.id)
        const clickedMembers = Array.from(data?.clickeds?.members || []);
        const clickedMember = clickedMembers.find(member => member.user_id == interaction.user.id);
        if (!clickedMember || !clickedMember.user_id) {
            if (interaction.isButton()) {
                const button = interaction.component;
                const currentLabel = button.label;
                const number_of_accepts = Number(currentLabel!.split("(")[1].split(")")[0]);
                const newLabel = `Negar (${number_of_accepts + 1})`;
    
    
                const row = createRow(
                    new ButtonBuilder({custom_id: data?.accept.custom_id, label: data?.accept.label, style: ButtonStyle.Success}),
                    new ButtonBuilder({custom_id: "sugerir/negar", label: newLabel, style: ButtonStyle.Danger})
                )
                
                const newMember = {
                    user_id: interaction.user.id,
                    escolha: "Negar",
                    last_date: new Date().toISOString(),
                };
    
                const updatedMembers = [newMember, ...data?.clickeds?.members || []];
                await db.button_data.set(interaction.message.id, {
                    delete: {
                        custom_id: "sugerir/negar",
                        label: newLabel
                    },
                    accept: {
                        custom_id: data?.accept.custom_id,
                        label: data?.accept.label
                    },
                    message_id: interaction.message.id,
                    clickeds: {
                        members: updatedMembers
                    }
                })
                
    
                await interaction.update({ components: [row] });
                return;

            }
        }
        else {
            await interaction.reply({content: "Você já escolheu " + "`" + clickedMember!.escolha + "`" + ` ha ${time(new Date(clickedMember!.last_date!), "R")}`, ephemeral})
            return
        }
    },
});
