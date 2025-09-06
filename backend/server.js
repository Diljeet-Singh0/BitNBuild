const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const coursesRoutes = require('./routes/courses.routes');
const authRoutes = require('./routes/auth.routes');
const enrollRoutes = require('./routes/enrollments.routes');
const communityRoutes = require('./routes/community.routes');

const app = express();
const cors= require("cors");
app.use(express.json());

connectDB();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/enrollments', enrollRoutes);
app.use('/api/community', communityRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
