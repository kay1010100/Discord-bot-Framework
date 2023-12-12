const { detailedLog } = require("../../utility");
const guildSettings = require('../../models/guildSettings');
const guildData = require('../../models/guildData');

module.exports = {
    name: 'guildDelete',
    once: false,
    async execute(guild, client) {
        // This event triggers when the bot leaves a guild
        await guildSettings.deleteOne({ id: guild.id });
        await guildData.deleteOne({ id: guild.id });
        detailedLog(client ,`[-] Left guild: ${guild.name} (${guild.memberCount}) Verified: ${guild.verified}`);
    }
}; 