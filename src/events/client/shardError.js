const { detailedLog } = require("../../utils/discord/discordUtils");

module.exports = {
    name: 'shardError',
    async execute(error, id, client) {
        return detailedLog(client, `shardError - ${error}`);
    }
};