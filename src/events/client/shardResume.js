const { detailedLog } = require("../../utility");

module.exports = {
    name: 'shardResume',
    async execute(id, replayedEvents, client) {
        if (replayedEvents > 1) return detailedLog(client, `shardResumedEvents - ${replayedEvents}`);
    }
};