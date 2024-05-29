const { detailedLog } = require("../../utils/discord/discordUtils");
require('dotenv').config();

module.exports = {
    name: 'debug',
    async execute(info, client) {
        if (process.env.DEBUG === 0) detailedLog(client, `clientDebug - ${info}`);
        return
    }
};