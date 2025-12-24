
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const pool = require('./db');
const rateLimit = require('./middleware/rateLimit');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const msgRoutes = require('./routes/messages');
const paymentRoutes = require('./routes/payments');

const app = express();
app.use(helmet());
app.use(xss());
app.use(cors());
app.use(express.json());
app.use(rateLimit);

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/messages', msgRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`🦅 DEO backend running on port ${PORT}`));
