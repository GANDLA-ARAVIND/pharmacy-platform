const express = require('express');
const Sale = require('../models/Sale');
const Medicine = require('../models/Medicine');
const auth = require('../middleware/auth');
const router = express.Router();
const { Parser } = require('json2csv');

// Create a sale (salesman only)
router.post('/', auth(['salesman']), async (req, res) => {
  const { items, total, customerName, customerPhone, paymentType } = req.body;
  try {
    // Validate stock
    for (const item of items) {
      const medicine = await Medicine.findOne({ _id: item.id });
      if (!medicine || medicine.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${item.name}` });
      }
    }

    // Update medicine quantities
    for (const item of items) {
      await Medicine.findOneAndUpdate(
        { _id: item.id },
        { $inc: { quantity: -item.quantity } },
      );
    }

    const sale = new Sale({
      items,
      total,
      date: new Date().toLocaleDateString('en-IN'),
      time: new Date().toLocaleTimeString('en-IN'),
      salesman: req.user.id, // From JWT
      customerName,
      customerPhone,
      paymentType,
    });

    await sale.save();
    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get sales history (admin: all sales, salesman: own sales)
router.get('/', auth(['admin', 'salesman']), async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { salesman: req.user.id };
    const sales = await Sale.find(query);
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Download sales as CSV (admin only)
router.get('/csv', auth(['admin']), async (req, res) => {
  try {
    const sales = await Sale.find();
    const fields = ['id', 'date', 'time', 'customerName', 'customerPhone', 'items', 'paymentType', 'total', 'salesman'];
    const csv = new Parser({ fields }).parse(sales.map(sale => ({
      ...sale._doc,
      items: sale.items.map(item => `${item.name} (${item.type}) x${item.quantity}`).join('; '),
    })));
    res.header('Content-Type', 'text/csv');
    res.attachment('sales_report.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;