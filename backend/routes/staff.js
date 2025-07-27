const express = require('express');
const Staff = require('../models/Staff');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all staff (admin only)
router.get('/', auth(['admin']), async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add staff (admin only)
router.post('/', auth(['admin']), async (req, res) => {
  const { name, email, role, salary, qualification, phone, address } = req.body;
  try {
    const staff = new Staff({
      name,
      email,
      role,
      salary,
      qualification,
      phone,
      address,
      joinDate: new Date().toISOString().split('T')[0],
      lastSalaryDate: new Date().toISOString().split('T')[0],
    });
    await staff.save();
    res.status(201).json(staff);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update staff (admin only)
router.put('/:id', auth(['admin']), async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete staff (admin only)
router.delete('/:id', auth(['admin']), async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.json({ message: 'Staff deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update salary payment date (admin only)
router.patch('/:id/pay', auth(['admin']), async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      { lastSalaryDate: new Date().toISOString().split('T')[0] },
      { new: true },
    );
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;