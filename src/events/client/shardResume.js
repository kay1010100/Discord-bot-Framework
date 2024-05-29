const { detailedLog } = require("../../utils/discord/discordUtils");

module.exports = {
    name: 'shardResume',
    async execute(id, replayedEvents, client) {
        if (replayedEvents > 1) return detailedLog(client, `shardResumedEvents - ${replayedEvents}`);
    }
};