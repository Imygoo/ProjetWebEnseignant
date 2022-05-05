const mongoose = require('mongoose');

const educationSchema = mongoose.Schema({
    formation: { type: String, required: false },
    semestre: { type: Number, require: false },
    ref: { type: String, required: false },
    intitule: { type: String, required: false },
    status: { type: String, required: false },
    hourCM: { type: Number, required: false },
    hourTD: { type: Number, required: false },
    hourTP: { type: Number, required: false },
    effectif: { type: Number, required: false },
    grCM: { type: Number, required: false },
    grTD: { type: Number, required: false },
    grTP: { type: Number, required: false },
});

module.exports = mongoose.model('Education', educationSchema);