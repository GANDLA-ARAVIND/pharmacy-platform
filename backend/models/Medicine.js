const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  manufacturer: { type: String },
  category: { type: String },
});

module.exports = mongoose.model('Medicine', medicineSchema);