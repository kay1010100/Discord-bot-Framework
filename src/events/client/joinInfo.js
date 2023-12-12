const { EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const { detailedLog, hasPermission } = require("../../utility");
const guildSettings = require('../../models/guildSettings');
const guildData = require('../../models/guildData');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(member, client) {
        // Automatic userinfo on join (Default "false")
        await guildSettings.findOne({ id: member.guild.id }, async (err, res) => {
            if (err) {
                detailedLog(client, err);
            } else {
                if (!res.defaultChannel) return;
                var botChannel = member.guild.channels.cache.get(res.defaultChannel);
                if (!hasPermission(client, botChannel, PermissionFlagsBits.SendMessages)) return;
    
                if (res.settings.lockdown == true) {
                    // Lockdown mode (2592000000 = 1 month/30 days) (1 day = 86400000)
                    var locktime = 2592000000;
                    var age = (Date.now() - member.user.createdTimestamp) - locktime;
    
                    if (age <= 0) {
                        if (member.kickable) {
                            await guildData.findOne({ id: member.guild.id }, async (err, resData) => {
                                var Kicked = new EmbedBuilder()
                                    .setDescription("**__Lockdown__**")
                                    .setColor("#8f0d0d")
                                    .setThumbnail(member.user.avatarURL())
                                    .addFields([
                                        {name: '**User ID**', value: member.id},
                                        {name: '**Username & Tag**', value: member.user.tag}
                                    ])
                                botChannel.send({embeds: [Kicked]});
    
                                const memberIndex = resData.members.findIndex(m => m.id == member.id);
                                resData.members.splice(memberIndex, 1);
    
                                await guildData.updateOne({ id: member.guild.id }, { $set: { members: resData.members } }, (err) => {
                                    if (err) return detailedLog(client, err);
                                });
    
                                return member.kick('Server in lockdown! \nAccount younger than 1 month.');
                            });
                        };
                    };
                };
    
                if (res.settings.autoInfo == true) {
                    // Invite link check
                    var age = (Date.now() - member.user.createdTimestamp) - 86400000;
                    var color;
                    var dateCreate = member.user.createdAt.toUTCString();
    
                    if (age <= 0) {
                        color = '#c516f5'; // Purple
                    } else {
                        color = '#21D121'; // Green
                    };
    
                    // User info on join
                    await guildData.findOne({ id: member.guild.id }, async (err, resData) => {
                        var fields = [
                            {name: '**User**', value: `<@${member.id}>`},
                            {name: '**Username & Tag**', value: `${member.displayName}#${member.user.discriminator}`},
                            {name: '**User ID**', value: member.id}
                        ]
                        var userEmbed = new EmbedBuilder()
                            .setDescription("**__User info__**")
                            .setColor(color)
                            .setThumbnail(member.user.avatarURL())
                            
                            if (member.guild.members.cache.get(client.user.id).permissions.has(PermissionFlagsBits.ManageGuild) || member.guild.members.cache.get(client.user.id).permissions.has(PermissionFlagsBits.Administrator)) {
                                if (err) {
                                    return detailedLog(client, err);
                                };
    
                                var newInvites;
                                await member.guild.invites.fetch()
                                .then(invites => { newInvites = invites; })
                                .catch(err => detailedLog(client, err));
    
                                const usedInvite = newInvites.find((inv) => {
                                    if (inv && resData != null) {
                                        const oldInv = resData.invites.find(a => a.code == inv.code);
                                        if (oldInv) {
                                            return oldInv.uses < inv.uses;
                                        } else {
                                            return undefined;
                                        };
                                    } else {
                                        return undefined;
                                    };
                                });
    
                                if (usedInvite) {
                                    fields.push({name: "**Invite code used**", value: `${usedInvite.code}\nUses: ${usedInvite.uses}\nInvite made by: ${usedInvite.inviter.tag} | ${usedInvite.inviter.username}`});
    
                                    await guildData.updateOne({ id: member.guild.id, "invites.code": usedInvite.code }, { $set: {"invites.$.uses": usedInvite.uses} }, async (err) => {
                                        if (err) detailedLog(client, err);
                                    });
                                } else {
                                    fields.push({name: "**Invite code used**", value: `Single use invite`});
                                };
    
                            } else {
                                fields.push({name: "**Invite code used**", value: `Missing permissions "MANAGE_GUILD"`});
                            };
                            userEmbed.addFields(fields)
                            .setFooter({text: `Request by: ${client.user.username}#${client.user.discriminator}`});
                        botChannel.send({embeds: [userEmbed]});
                    });
                };
            };
        });
    }
};