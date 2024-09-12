import { ChannelType, Interaction, PermissionFlagsBits } from "discord.js";

export async function createTicketChannel(interaction: Interaction,parent: string, reason?: string) {
    const rolesForPermissions = ["1231320719712059534", "1231320720945184839", "1231320721578266646", "1231320723260309585", "1231320724380319774"];
    if (!interaction) return;

    const permissions = [
      {
          id: interaction.user.id,
          allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.AttachFiles]
      },
      {
          id: "941815669366861874",
          deny: [PermissionFlagsBits.ViewChannel]
      },
  ];


    rolesForPermissions.forEach(role => {
        permissions.push({
            id: role,
            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.AttachFiles]
        });
    });

    const channel = await interaction.guild?.channels.create({
      name: `${reason}-${interaction.user.globalName}`,
      parent,
      type: ChannelType.GuildText,
      topic: `${interaction.user.id}`,
      permissionOverwrites: permissions
    });

    return channel;
}