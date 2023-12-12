const moongoose = require('mongoose');
module.exports = moongoose.connect('mongodb://localhost:27017/chaosShield',{ useNewUrlParser: true, useUnifiedTopology: true });