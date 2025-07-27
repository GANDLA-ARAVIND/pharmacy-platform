const mongoose = require('mongoose');

const pinnedItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  quantity: { type: Number, required: true, min: 1 },
});

module.exports = mongoose.model('PinnedItem', pinnedItemSchema);