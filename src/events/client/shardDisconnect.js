const { detailedLog } = require("../../utility");

module.exports = {
    name: 'shardDisconnect',
    async execute(event, id, client) {
        return detailedLog(client, `shardDisconnect - ${event}`);
    }
};