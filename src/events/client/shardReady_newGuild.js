const {  PermissionFlagsBits } = require('discord.js');
const { detailedLog } = require("../../utility");
const guildSettings = require('../../models/guildSettings');
const guildData = require('../../models/guildData');

module.exports = {
    name: 'shardReady',
    once: true,
    async execute(id, unavailableGuilds, client) {
        // Generate default settings if nothing is found
        client.guilds.cache.forEach( async guild => {
            const server = await guildSettings.findOne({ id: guild.id });
            if (!server) {
                const newServer = await guildSettings.create({
                    id: guild.id
                });
                await newServer.save();
                detailedLog(client, `[+] Joined guild: ${guild.name} (`+guild.memberCount+`) Verified: ${guild.verified}`);
            };

            var invitesData = [];

            if (guild.members.cache.get(client.user.id).permissions.has(PermissionFlagsBits.ManageGuild) || guild.members.cache.get(client.user.id).permissions.has(PermissionFlagsBits.Administrator)) {
                await guild.invites.fetch()
                .then(async invites => {
                    invites.forEach(async inv => {
                        invitesData.push({code: inv.code, uses: inv.uses});
                    });
                })
                .catch(err => detailedLog(client, err));
            };

            const data = await guildData.findOne({ id: guild.id });
            if (!data) {
                const newData = await guildData.create({
                    id: guild.id,
                    invites: invitesData
                });
                await newData.save();

            } else if (data) {
                guildData.updateOne({ id: guild.id }, {
                    id: guild.id,
                    invites: invitesData
                }, (err) => {
                    if (err) return detailedLog(client, err);
                });
            };
        });
    }
};