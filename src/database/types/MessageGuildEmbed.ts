type Footer = {
    name: string
    value: string
    inline: boolean
}
export type MessageGuildEmbed = {
    title: string,
    description: string
    color?: string
    image?: string
    timestamp?: string
    thumnmail?: string 
    footer: Footer[]
}