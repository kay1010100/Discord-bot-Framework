const { detailedLog } = require("../../utility");

module.exports = {
    name: 'shardReconnect',
    async execute(id, client) {
        return detailedLog(client, `shardReconected`);
    }
};