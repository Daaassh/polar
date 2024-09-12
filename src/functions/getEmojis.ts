import { findEmoji } from "@magicyan/discord";
import { Client, formatEmoji } from "discord.js";

export  async function getEmojis(client: Client<true>) {
    const guild = await client.guilds.fetch("1221222837923352606");
    const emojis = await findEmoji(guild);

    return {
        config: formatEmoji(emojis.byName("config")?.id!),
        minecraft: formatEmoji(emojis.byName("Minecraft_World_Cube")?.id!),   
        xp: formatEmoji(emojis.byName("mine_xp")?.id!),
        message: formatEmoji(emojis.byName("questao1")?.id!),
        compras: formatEmoji(emojis.byName("carrinhodecompras")?.id!),
        denuncias: formatEmoji(emojis.byName("alarm~1")?.id!),
        ip: formatEmoji(emojis.byName("skript")?.id!),
        port: formatEmoji(findEmoji(guild).byName("door")?.id!),
        suport: formatEmoji(emojis.byName("suporte")?.identifier!),
        bloco_minecraft: formatEmoji(emojis.byName("blocominecraft")?.id!),
        name: formatEmoji(emojis.byName("server")?.id!),
        status: formatEmoji(emojis.byName("status")?.id!)
    }
}