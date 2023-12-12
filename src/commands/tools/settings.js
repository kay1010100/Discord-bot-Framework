const { SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const { detailedLog } = require("../../utility");
const guildSettings = require('../../models/guildSettings');

module.exports = {
    data: new SlashCommandBuilder()
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator || PermissionFlagsBits.ManageGuild)
        .setName('settings')
        .setDescription('Change to your needs!')
        .addChannelOption(options =>
            options.setName('channel')
            .setDescription('Set a channel as the default output channel for the bot.')
        )
        .addBooleanOption(options =>
            options.setName('autoinfo')
            .setDescription('This will enable/disable autoinfo.')
        )
        .addBooleanOption(options =>
            options.setName('automod')
            .setDescription('This will enable/disable automod.')
        )
        .addBooleanOption(options =>
            options.setName('antiraid')
            .setDescription('This will enable/disable antiraid.')
        )
        .addBooleanOption(options =>
            options.setName('antinuke')
            .setDescription('This will enable/disable antinuke.')
        )
        .addBooleanOption(options =>
            options.setName('lockdown')
            .setDescription('This will enable/disable lockdown.')
        )
        .addBooleanOption(options =>
            options.setName('auth')
            .setDescription('This will enable/disable authentication.')
        ),
    async execute(interaction, client) {
        const options = interaction.options._hoistedOptions;
        await guildSettings.findOne({ id: interaction.guild.id }, async (err, res) => {
            if (!res || err) {
                // Return new Error when no options has been found.
                throw new Error('Something went wrong when trying to run a command.');
            };

            const opts = {
                defaultChannel: res.defaultChannel,
                settings: {
                    autoInfo: res.settings.autoInfo,
                    antiNuke: res.settings.antiNuke,
                    antiRaid: res.settings.antiRaid,
                    autoMod: res.settings.autoMod,
                    lockdown: res.settings.lockdown,
                    auth: res.settings.auth 
                }
            };

            var desc = [];

            options.forEach(async option => {
                switch (option.name) {
                    default: {
                        // Return new Error when no options has been found.
                        throw new Error('Something went wrong when trying to run a command.');
                        break;
                    };
                    case 'channel': {
                        if (option.channel.type != ChannelType.GuildText) {
                            await interaction.reply({
                                embeds: [new EmbedBuilder()
                                    .setColor('#ff4444')
                                    .setTitle('Error')
                                    .setDescription('Channel must be a *#textchannel*')
                                ],
                                ephemeral: true
                            });
        
                        } else {
                            opts.defaultChannel = option.value;
                            desc.push(`Default Channel changed to ${option.channel}`);
                        };
                        break;
                    };
                    case 'autoinfo': {
                        opts.settings.autoInfo = option.value;
                        desc.push(`Auto info changed to *${option.value}*`);
                        break;
                    };
                    case 'antinuke': {
                        opts.settings.antiNuke = option.value;
                        desc.push(`Anti nuke changed to *${option.value}*`);
                        break;
                    };
                    case 'antiraid': {
                        opts.settings.antiRaid = option.value;
                        desc.push(`Anti raid changed to *${option.value}*`);
                        break;
                    };
                    case 'automod': {
                        opts.settings.autoMod = option.value;
                        desc.push(`Auto mod changed to *${option.value}*`);
                        break;
                    };
                    case 'lockdown': {
                        opts.settings.lockdown = option.value;
                        desc.push(`Lockdown changed to *${option.value}*`);
                        break;
                    };
                    case 'auth': {
                        opts.settings.auth = option.value;
                        desc.push(`Auth changed to *${option.value}*`);
                        break;
                    };
                };
            });

            if (desc.length == 0) {
                await interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setColor('#ff4444')
                        .setTitle('__Settings__')
                        .setDescription('Please profide atleat 1 argument with this command.')
                    ],
                    ephemeral: true
                });
            } else {
                guildSettings.updateOne({ id: interaction.guild.id }, {
                    defaultChannel: opts.defaultChannel,
                    settings: opts.settings
                }, (err) => {
                    if (err) return detailedLog(client, err);
                });

                await interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setColor('#44ff44')
                        .setTitle('__Settings__')
                        .setDescription(desc.join('\n'))
                    ],
                    ephemeral: true
                });
            };
        });
    }
};