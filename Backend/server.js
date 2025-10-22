const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://kiranjaiswalkj:Jaiswal%402002@cluster0.yyohjhr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
console.log('Connecting to MongoDB with URI:', mongoUri);
mongoose.connect(mongoUri)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err.message));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
  console.log('Root route accessed from:', req.ip);
  res.json({ message: 'CipherStudio Backend API' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
