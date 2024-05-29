const { detailedLog } = require("../../utils/discord/discordUtils");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        return detailedLog(client, `clientReady - Client online ${client.user.tag}`);
    }
};