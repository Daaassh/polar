import { Event } from "#base";
import { db } from "#database";
import { createEmbed } from "@magicyan/discord";

new Event({
    name: "Message Create | Ticket",
    event: "messageCreate",
    async run(message){
        if (message.author.bot){
            return
        }
        const data = await db.tickets.get(message.channelId)
        if (data){
            if (data.ticket.atended == true) {
                return
            }
            else {
                const user = message.client.users.cache.get(data.ticket.user_id)
                if (user) {
                    if (!(user.id == message.author.id)){
                        const infos = await db.infos.get(message.guildId!)
                        const ticket = await db.tickets.get(message.channelId)
                        await db.infos.set(message.guildId!, { atendidos: infos!.atendidos + 1 })
                        await db.tickets.set(message.channelId, { ticket: { atended: true, channel_id: ticket?.ticket.channel_id, user_id: ticket?.ticket.user_id } })
                        const embed = createEmbed({
                            title: "Alguem respondeu seu ticket!",
                            fields: [
                                {
                                    name: "Atendido por: ",
                                    value: `${message.author}`,
                                },
                                {
                                    name: "No Canal: ",
                                    value: `${message.channel}`,
                                }
                            ],
                            footer: {text: "Não deixe-o no vácuo, responda."},
                            color: "Purple"
                        })
                        await user.send({embeds: [embed]})
                    }
                }
            }
        }
    }
})