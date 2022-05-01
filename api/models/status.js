const mongoose = require('mongoose');

const statusSchema = mongoose.Schema({
    name: { type: String, required: true },
    heureTD: { type: Number, required: true },
    heureTP: { type: Number, required: true },
    heureCM: { type: Number, required: true },
});

module.exports = mongoose.model('Status', statusSchema);