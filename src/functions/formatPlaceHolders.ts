import { User } from "discord.js";

export function formatPlaceHolders(message: string, user: User) {
    let message_send = message.replaceAll("[user]", user.globalName?.toString()!);

    return message_send
}