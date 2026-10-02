require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const servicesRouter = require('./routes/services');
const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Esevadesk Backend API is running!'));
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'Esevadesk API' }));
app.use('/api/services', servicesRouter);
app.use('/api/admin', adminRouter);
app.use('/api/users', usersRouter);
app.use('/api/contact', require('./routes/contact'));
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`Esevadesk backend on http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));