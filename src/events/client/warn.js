const { detailedLog } = require("../../utils/discord/discordUtils");

module.exports = {
    name: 'warn',
    async execute(warn, client) {
        return detailedLog(client, `clientWarn - ${warn}`);
    }
};