const express = require('express');
const Medicine = require('../models/Medicine');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all medicines (accessible to all roles)
router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add medicine (admin only)
router.post('/', auth(['admin']), async (req, res) => {
  const { name, price, quantity, expiryDate, manufacturer, category } = req.body;
  try {
    const medicine = new Medicine({ name, price, quantity, expiryDate, manufacturer, category });
    await medicine.save();
    res.status(201).json(medicine);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update medicine (admin only)
router.put('/:id', auth(['admin']), async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete medicine (admin only)
router.delete('/:id', auth(['admin']), async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    res.json({ message: 'Medicine deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;