const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
    id_user: { type: String, required: true },
    id_education: { type: String, required: true },
    grCM: { type: Number, required: false, default: 0 },
    grTD: { type: Number, required: false, default: 0 },
    grTP: { type: Number, required: false, default: 0 },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);