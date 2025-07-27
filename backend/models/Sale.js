const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  items: [
    {
      id: String,
      name: String,
      type: String,
      quantity: Number,
      price: Number,
    },
  ],
  total: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  salesman: { type: String, required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  paymentType: { type: String, enum: ['cash', 'online'], required: true },
});

module.exports = mongoose.model('Sale', saleSchema);