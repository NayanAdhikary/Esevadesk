require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const services = [
  { name: 'Aadhaar', icon: '🆔', category: 'Identity', items: ['Address Update', 'DOB Update', 'PVC Card Order', 'All Links'], price: '₹150 onwards', amount: 150, description: 'Update or correct your Aadhaar details.', processingTime: '24–48 hours' },
  { name: 'PAN Card', icon: '📄', category: 'Identity', items: ['New PAN', 'Lost PAN', 'Business PAN'], price: '₹250 onwards', amount: 250, description: 'Apply for new PAN or reprint lost PAN.', processingTime: '3–5 days' },
  { name: 'Voter ID', icon: '🗳️', category: 'Identity', items: ['All Services'], price: '₹120 onwards', amount: 120, description: 'New voter registration and corrections.', processingTime: '2–4 days' },
  { name: 'PF (Provident Fund)', icon: '🏦', category: 'Finance', items: ['Withdraw', 'Passbook', 'All Kind of Works'], price: '₹300 onwards', amount: 300, description: 'PF withdrawal and passbook services.', processingTime: '3–7 days' },
  { name: 'Passport', icon: '🛂', category: 'Travel', items: ['Renew', 'New Apply'], price: '₹800 onwards', amount: 800, description: 'Passport application and renewal assistance.', processingTime: '5–10 days' },
  { name: 'Visa', icon: '✈️', category: 'Travel', items: ['New Apply'], price: '₹1,500 onwards', amount: 1500, description: 'Visa application for various countries.', processingTime: '7–15 days' },
  { name: 'Car Rentals', icon: '🚗', category: 'Travel', items: ['Bike', 'Car'], price: '₹1,200 / day', amount: 1200, description: 'Self-drive and chauffeur car rentals.', processingTime: 'Same day' },
  { name: 'Cash Deposit', icon: '💰', category: 'Banking', items: ['Deposit'], price: '₹50 onwards', amount: 50, description: 'Assisted cash deposit to any bank.', processingTime: 'Same day' },
  { name: 'Travel Services', icon: '🧳', category: 'Travel', items: ['Food', 'Fire', 'WiFi', 'Bike', 'Car'], price: '₹499 onwards', amount: 499, description: 'Travel insurance and add-on covers.', processingTime: '1–2 days' },
  { name: 'Licence', icon: '📝', category: 'Identity', items: ['Trade Licence', 'New Licence', 'Renew'], price: '₹400 onwards', amount: 400, description: 'Driving licence and trade licence services.', processingTime: '3–7 days' },
  { name: 'Electricity Bill Pay', icon: '⚡', category: 'Bills', items: ['Bill Payment'], price: '₹20 fee', amount: 20, description: 'Pay electricity bills online.', processingTime: 'Instant' },
  { name: 'All Bill Payments', icon: '🧾', category: 'Bills', items: ['Tax', 'Khajna', 'Water', 'Gas', 'Broadband'], price: '₹30 onwards', amount: 30, description: 'Pay all utility bills in one place.', processingTime: 'Instant' },
  { name: 'LIC Premium', icon: '🛡️', category: 'Finance', items: ['Premium Pay'], price: '₹50 onwards', amount: 50, description: 'LIC premium payment and policy status.', processingTime: 'Instant' },
  { name: 'Doc Consult', icon: '💬', category: 'Documents', items: ['New Lic', 'Export', 'Notary'], price: '₹500 onwards', amount: 500, description: 'Document consultation and drafting.', processingTime: '1–2 days' },
  { name: 'DTDC Courier', icon: '📦', category: 'Documents', items: ['Domestic', 'International', 'Tracking'], price: '₹60 onwards', amount: 60, description: 'Courier booking and tracking.', processingTime: 'Same day' },
  { name: 'Passport Size Photo', icon: '📸', category: 'Documents', items: ['Instant Print', 'Digital Copy', 'Export'], price: '₹80 / 8 copies', amount: 80, description: 'Instant passport size photos.', processingTime: 'Instant' },
  { name: 'Tax / Khajna Pay', icon: '🏛️', category: 'Bills', items: ['Property Tax', 'Land Khajna', 'Municipal Tax'], price: '₹40 onwards', amount: 40, description: 'Property and land tax payment.', processingTime: 'Instant' },
  { name: 'Banking Service', icon: '🏧', category: 'Banking', items: ['Account Opening', 'Cash Withdrawal', 'Balance Enquiry'], price: '₹30 onwards', amount: 30, description: 'Assisted banking services.', processingTime: 'Same day' }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log('✅ Services seeded');
  process.exit();
}

seed().catch(err => console.error(err));