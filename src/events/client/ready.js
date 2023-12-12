const { detailedLog } = require("../../utility");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        return detailedLog(client, `clientReady - Client online ${client.user.tag}`);
    }
};