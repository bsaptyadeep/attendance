const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    name: { type: String, required: true },
    branch: { type: String, required: true },
    year: { type: Number, required: true },
    date: { type: String, required: true },
    subject: { type: String, require: true}
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);