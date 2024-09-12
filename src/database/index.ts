import { QuickDB } from "quick.db";
import { MemberData } from "./interfaces/MemberData.js";
import { TicketsData } from "./interfaces/TicketsData.js";
import { TicketInfo } from "./interfaces/TicketsInfo.js";
import { ButtonData } from "./interfaces/ButtonsData.js";
import { PlayerSuggesting } from "./interfaces/PlayerSuggesting.js";
import { AutoMessages } from "./interfaces/AutoMessages.js";
import { MessageGuild } from "./interfaces/MessageGuild.js";

const filePath = rootTo("redelufy.sqlite");

const db = {
    tickets: new QuickDB<TicketsData>({ filePath, table: "tickets" }),
    infos: new QuickDB<TicketInfo>({filePath, table: "infos"}),
    button_data: new QuickDB<ButtonData>({filePath, table: "button_data"}),
    members: new QuickDB<MemberData>({ filePath, table: "members" }),
    suggesting: new QuickDB<PlayerSuggesting>({ filePath, table: "suggesting" }),
    messages: new QuickDB<AutoMessages>({ filePath, table: "messages" }),
    embeds: new QuickDB<MessageGuild>({ filePath, table: "embeds" }),
};

export { db };