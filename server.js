const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./src/config/controllers/models/routes/authRoutes');
const categoryRoutes = require('./src/config/controllers/models/routes/categoryRoutes');
const courseRoutes = require('./src/config/controllers/models/routes/courseRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/courses', courseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});