const { detailedLog } = require("../../utils/discord/discordUtils");

module.exports = {
    name: 'shardReconnect',
    async execute(id, client) {
        return detailedLog(client, `shardReconected`);
    }
};