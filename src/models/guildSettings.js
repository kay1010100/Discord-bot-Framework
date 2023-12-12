const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    id: { type: String, required: true },
    defaultChannel: { type: String, required: true, default: '0' },
    settings: {
        autoInfo: { type: Boolean, required: true, default: false },
        antiNuke: { type: Boolean, required: true, default: false },
        antiRaid: { type: Boolean, required: true, default: false },
        autoMod: { type: Boolean, required: true, default: false },
        lockdown: { type: Boolean, required: true, default: false },
        auth: { type: Boolean, required: true, default: false }
    }
});

const guildSettings = module.exports = mongoose.model('guildSettings', guildSchema, 'guildSettings');