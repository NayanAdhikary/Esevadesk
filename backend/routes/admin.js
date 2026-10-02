const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Application = require('../models/Application');
const auth = require('../middleware/auth');
const { sendStatusUpdateEmail } = require('../utils/email');

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (email !== process.env.ADMIN_EMAIL) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

// GET /api/admin/applications
router.get('/applications', auth, async (req, res) => {
  const apps = await Application.find().sort({ createdAt: -1 });
  res.json(apps);
});

// PATCH /api/admin/applications/:id/status
router.patch('/applications/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ error: 'Application not found' });
    app.status = status;
    app.statusHistory.push({ status });
    await app.save();
    await sendStatusUpdateEmail(app);
    res.json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// PATCH /api/admin/applications/:id/payment
router.patch('/applications/:id/payment', auth, async (req, res) => {
  try {
    const { paymentStatus } = req.body; // 'verified' or 'rejected'
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ error: 'Not found' });
    app.paymentStatus = paymentStatus;
    await app.save();
    // optional: send email
    res.json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;