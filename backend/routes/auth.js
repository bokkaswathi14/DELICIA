const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });

    await newUser.save();

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

  

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email, password });

    if (!user|| !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Login error:', err);  // ✅ See this in your terminal
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// UPDATE PROFILE
router.put('/update', async (req, res) => {
  try {
    const { email, fullName, qualification, dob, gender, address } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { fullName, qualification, dob, gender, address },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ postedAt: -1 }); // latest first
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load recipes', error: err.message });
  }
});
  

module.exports = router;