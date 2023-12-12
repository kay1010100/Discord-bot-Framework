const { detailedLog } = require("../../utility");
const guildData = require('../../models/guildData');

module.exports = {
    name: 'inviteDelete',
    once: false,
    async execute(invite, client) {
        // Invite link cache delete
        guildData.updateOne({ id: invite.guild.id }, { $pull: { invites: { code: invite.code } } }, async (err) => {
            if (err) detailedLog(err);
        });
    }
};