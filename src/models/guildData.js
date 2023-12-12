const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: { type: String, required: true },
    invites: { type: Array, required: true }
});

const guildData = module.exports = mongoose.model('guildData', dataSchema, 'guildData');