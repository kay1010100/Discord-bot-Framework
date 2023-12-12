const { detailedLog } = require("../../utility");

module.exports = {
    name: 'shardError',
    async execute(error, id, client) {
        return detailedLog(client, `shardError - ${error}`);
    }
};