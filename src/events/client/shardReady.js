const { detailedLog } = require("../../utility");
const guildSettings = require('../../models/guildSettings');

module.exports = {
    name: 'shardReady',
    once: true,
    async execute(id, unavailableGuilds, client) {
        // Log shard count on init
        return detailedLog(client, `shardReady - guild count ${client.guilds.cache.size}`);
    }
};