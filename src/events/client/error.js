const { detailedLog } = require("../../utility");

module.exports = {
    name: 'error',
    async execute(error, client) {
        return detailedLog(client, `clientError - ${error}`);
    }
};