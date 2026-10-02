const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Application = require('../models/Application');
const userAuth = require('../middleware/userAuth');

// POST /api/users/signup
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ error: 'Email already exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, phone, password: hash });
    const token = jwt.sign({ id: user._id, email, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, fullName, email, phone } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, fullName: user.fullName, email, phone: user.phone } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/users/me
router.get('/me', userAuth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

// GET /api/users/my-applications
router.get('/my-applications', userAuth, async (req, res) => {
  const apps = await Application.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(apps);
});

module.exports = router;
