const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers || PermissionFlagsBits.BanMembers || PermissionFlagsBits.ManageGuild || PermissionFlagsBits.Administrator)
        .setName('info')
        .setDescription('Get a users public account information.')
        .addUserOption((option) =>
            option.setName('target')
            .setDescription('The user')
            .setRequired(true)
        ),
    async execute(interaction, client) {
        const options = interaction.options._hoistedOptions[0];

        if (!options) {
            // Return new Error when no options has been found.
            throw new Error('Something went wrong when trying to run a command.');

        } else if (options.name === 'target') {
            const user = options.user;
            
            var roleList = [];
            await interaction.guild.members.cache.get(user.id).roles.cache.sort((a, b) => {return b.rawPosition - a.rawPosition}).forEach(role => {
                if (role.name != "@everyone") {
                    roleList.push(`<@&${role.id}>`);
                };
            });

            switch (roleList.length) {
                case 0: {
                    roleList = "No roles";
                    break;
                }
                default: {
                    roleList.join(" ");
                    break;
                }
            };
    
            var dateCreate = user.createdAt.toUTCString();
            var dateJoin = interaction.guild.members.cache.get(user.id).joinedAt.toUTCString();;
    
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor(process.env.COLOR)
                    .setDescription("**__User info__**")
                    .setThumbnail(user.avatarURL())
                    .addFields([
                        {name: `**User**`, value: `<@${user.id}>`},
                        {name: `**User ID**`, value: `${user.id}`},
                        {name: `**Created account on**`, value: `${dateCreate}`},
                        {name: `**Joined server on**`, value: `${dateJoin}`},
                        {name: `**Roles**`, value: `${roleList}`}
                    ])
                    .setFooter({text: `Request by: ${interaction.user.username}`})
                ],
                ephemeral: false
            });
        } else {
            throw new Error('Something went wrong when trying to run a command.');
        };
    }
};