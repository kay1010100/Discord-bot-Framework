const { detailedLog } = require("../../utility");
const guildSettings = require('../../models/guildSettings');
const guildData = require('../../models/guildData');

module.exports = {
    name: 'guildCreate',
    once: false,
    async execute(guild, client) {
        // This event triggers when the bot joins a guild
        const settings = await guildSettings.findOne({ id: guild.id });
        if (!settings) {
            const newSettings = await guildSettings.create({
                id: guild.id
            });
            await newSettings.save();
        };

        const data = await guildData.findOne({ id: guild.id });
            if (!data) {
                var invitesData = []; 
    
                const newData = await guildData.create({
                    id: guild.id,
                    invites: invitesData
                });
            await newData.save();
        };
    
        detailedLog(client, `[+] Joined guild: ${guild.name} (${guild.memberCount}) Verified: ${guild.verified}`);
    }
};