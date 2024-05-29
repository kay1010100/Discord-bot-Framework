const { detailedLog } = require("../../utils/discord/discordUtils");

module.exports = {
    name: 'error',
    async execute(error, client) {
        return detailedLog(client, `clientError - ${error}`);
    }
};