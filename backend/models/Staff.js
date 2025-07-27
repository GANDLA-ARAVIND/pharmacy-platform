const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'salesman'], required: true },
  salary: { type: Number, required: true },
  qualification: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  joinDate: { type: String, required: true },
  lastSalaryDate: { type: String, required: true },
});

module.exports = mongoose.model('Staff', staffSchema);