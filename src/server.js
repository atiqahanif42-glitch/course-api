const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/courses', courseRoutes);

// 404 Route Not Found Handler (Mandatory Evidence Case 5)
app.use((req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.originalUrl} not found on this server.`
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});