const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, require: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true },
    maxHours: { type: Number, required: true },
});

module.exports = mongoose.model('Teacher', teacherSchema);