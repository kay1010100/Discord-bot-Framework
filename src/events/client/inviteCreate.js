const { detailedLog } = require("../../utility");
const guildData = require('../../models/guildData');

module.exports = {
    name: 'inviteCreate',
    once: false,
    async execute(invite, client) {
        // Invite link cache create
        guildData.updateOne({ id: invite.guild.id }, { $push: { invites: { code: invite.code, uses: invite.uses } } }, async (err) => {
            if (err) detailedLog(client ,err);
        });
    }
};