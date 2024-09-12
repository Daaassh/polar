import { PlayerData } from "interfaces/PlayerData.js"


export interface ButtonData{
    message_id: string
    delete: {
        custom_id: string,
        label: string,        
    }
    accept: {
        custom_id: string,
        label: string,
    }
    clickeds?: {
        members: PlayerData[]
    }
}