const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Service = require('../models/Service');
const Application = require('../models/Application');
const { sendNewApplicationEmail, sendUserConfirmationEmail, sendPaymentProofNotification } = require('../utils/email');

// Optional auth: decode if token present
const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next();
  try {
    const jwt = require('jsonwebtoken');
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {}
  next();
};

// Multer storage
const { uploadToCloudinary } = require('../utils/cloudinary');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only JPG, PNG, PDF allowed'));
  }
});

// GET all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ name: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST application with file upload
router.post('/applications', optionalAuth, upload.array('documents', 5), async (req, res) => {
  try {
    const { serviceId, fullName, email, phone, notes } = req.body;
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ error: 'Service not found' });

    const referenceId = `ESV-${new Date().getFullYear()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const documents = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const isPdf = file.mimetype === 'application/pdf';
        const { url, publicId } = await uploadToCloudinary(
          file.buffer,
          'esevadesk/documents',
          isPdf ? 'raw' : 'image'
        );
        documents.push({ filename: file.originalname, url, publicId });
      }
    }

    const application = new Application({
      referenceId,
      userId: req.user?.id,
      serviceId,
      serviceName: service.name,
      fullName, email, phone, notes,
      documents,
      amount: service.amount || 0,
      paymentStatus: 'pending',
      paymentMethod: 'UPI',
      statusHistory: [{ status: 'pending' }]
    });
    await application.save();

    // Send emails (non-blocking)
    sendNewApplicationEmail(application).catch(console.error);
    sendUserConfirmationEmail(application).catch(console.error);

    res.status(201).json({
      success: true,
      referenceId,
      amount: application.amount,
      paymentInfo: {
        upiId: process.env.UPI_ID || 'esevadesk@upi',
        bankName: process.env.BANK_NAME || 'State Bank of India',
        accountNumber: process.env.BANK_ACC || 'XXXXXX1234',
        ifsc: process.env.BANK_IFSC || 'SBIN0001234',
        amount: application.amount
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const uploadPayment = multer({ storage: multer.memoryStorage() });

router.post('/applications/:referenceId/payment', uploadPayment.single('proof'), async (req, res) => {
  try {
    const { utrNumber } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Payment proof required' });

    const app = await Application.findOne({ referenceId: req.params.referenceId });
    if (!app) return res.status(404).json({ error: 'Application not found' });

    const { url, publicId } = await uploadToCloudinary(
      req.file.buffer,
      'esevadesk/payments',
      'image'
    );

    app.utrNumber = utrNumber;
    app.paymentProof = { filename: req.file.originalname, url, publicId };
    app.paymentStatus = 'proof-uploaded';
    await app.save();

    if (typeof sendPaymentProofNotification === 'function') {
      sendPaymentProofNotification(app).catch(console.error);
    }

    res.json({ success: true, message: 'Payment proof uploaded. Awaiting verification.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/services/status/:referenceId
router.get('/status/:referenceId', async (req, res) => {
  try {
    const app = await Application.findOne({ referenceId: req.params.referenceId });
    if (!app) return res.status(404).json({ error: 'Application not found' });
    res.json({
      referenceId: app.referenceId,
      serviceName: app.serviceName,
      status: app.status,
      statusHistory: app.statusHistory,
      createdAt: app.createdAt
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;