const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user'); // Capitalized User.js
const recipeRoutes = require('./routes/recipes');
const authRoutes = require('./routes/auth');
const app = express();
const PORT = 5000;

// ✅ Replace with your actual working URI for 'saimanasa' database
const uri = "mongodb+srv://manasa:Mongoo465@cluster0.7ygnktu.mongodb.net/saimanasa?retryWrites=true&w=majority";

// ✅ Connect to MongoDB Atlas
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.send('Welcome to the Delicia API!');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
