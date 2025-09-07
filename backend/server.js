require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const authRoutes = require('./src/routes/auth.routes');
const coursesRoutes = require('./src/routes/courses.routes');
const enrollRoutes = require('./src/routes/enrollments.routes');
const communityRoutes = require('./src/routes/community.routes');
const paymentsRoutes = require("./src/routes/payments.routes");
// server.js
const enrollController = require('./src/controllers/enrollments.controller');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Connect DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/enrollments', enrollRoutes);
app.use('/api/community', communityRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/enrollments", enrollRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
