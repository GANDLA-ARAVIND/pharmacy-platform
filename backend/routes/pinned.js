const express = require('express');
const PinnedItem = require('../models/PinnedItem');
const auth = require('../middleware/auth');
const router = express.Router();

// Get pinned items (customer only)
router.get('/', auth(['customer']), async (req, res) => {
  try {
    const pinnedItems = await PinnedItem.find({ userId: req.user.id }).populate('medicineId');
    res.json(pinnedItems);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add pinned item (customer only)
router.post('/', auth(['customer']), async (req, res) => {
  const { medicineId, quantity } = req.body;
  try {
    const existingPin = await PinnedItem.findOne({ userId: req.user.id, medicineId });
    if (existingPin) {
      existingPin.quantity += quantity;
      await existingPin.save();
      return res.json(existingPin);
    }
    const pinnedItem = new PinnedItem({ userId: req.user.id, medicineId, quantity });
    await pinnedItem.save();
    res.status(201).json(pinnedItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete pinned item (customer only)
router.delete('/:id', auth(['customer']), async (req, res) => {
  try {
    const pinnedItem = await PinnedItem.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!pinnedItem) return res.status(404).json({ message: 'Pinned item not found' });
    res.json({ message: 'Pinned item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;