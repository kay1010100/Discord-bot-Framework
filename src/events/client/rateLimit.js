const { detailedLog } = require("../../utility");

module.exports = {
    name: 'error',
    rest: true,
    async execute(rateLimitInfo, client) {
        return detailedLog(client, `rateLimited - ${rateLimitInfo}`);
    }
};