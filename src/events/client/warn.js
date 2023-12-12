const { detailedLog } = require("../../utility");

module.exports = {
    name: 'warn',
    async execute(warn, client) {
        return detailedLog(client, `clientWarn - ${warn}`);
    }
};