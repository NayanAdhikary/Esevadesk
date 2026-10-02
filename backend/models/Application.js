const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  referenceId: { type: String, unique: true, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional if guest
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  serviceName: String,
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  notes: String,
  documents: [{ filename: String, url: String, publicId: String }],

  // Payment fields
  amount: { type: Number, default: 0 },
  paymentStatus: {
    type: String,
    default: 'pending',
    enum: ['pending', 'proof-uploaded', 'verified', 'rejected']
  },
  paymentMethod: { type: String, default: 'UPI' }, // UPI / Bank
  utrNumber: String,
  paymentProof: { filename: String, url: String, publicId: String },

  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'in-progress', 'completed', 'rejected']
  },
  statusHistory: [{ status: String, date: { type: Date, default: Date.now } }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);