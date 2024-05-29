require("dotenv").config();

if (process.env.USE_MONGOOSE) {
    const mongoose = require('mongoose');
    module.exports = mongoose.connect(`${process.env.DATABASE}`,{ useNewUrlParser: true, useUnifiedTopology: true });
}