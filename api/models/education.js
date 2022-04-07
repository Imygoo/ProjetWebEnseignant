const mongoose = require('mongoose');

const educationSchema = mongoose.Schema({
    formation: { type: String, required: true },
    semestre: { type: Number, require: true },
    ref: { type: String, required: true },
    intitule: { type: String, required: true },
    status: { type: String, required: true },
    hourCM: { type: Number, required: false },
    hourTD: { type: Number, required: false },
    hourTP: { type: Number, required: false },
    effectif: { type: Number, required: false },
    grpCM: { type: Number, required: false },
    grpTD: { type: Number, required: false },
    grpTP: { type: Number, required: false },
});

module.exports = mongoose.model('Education', educationSchema);