const { detailedLog } = require("../../utils/discord/discordUtils");

module.exports = {
    name: 'shardDisconnect',
    async execute(event, id, client) {
        return detailedLog(client, `shardDisconnect - ${event}`);
    }
};