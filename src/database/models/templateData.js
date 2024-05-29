const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true }
});

const templateData = module.exports = mongoose.model('template', templateSchema, 'marketData');