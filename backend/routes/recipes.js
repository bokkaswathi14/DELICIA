const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe'); // make sure this model exists

// POST a new recipe
router.post('/', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json({ message: 'Recipe posted successfully', recipe });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to post recipe', error: err.message });
  }
});

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ postedAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch recipes', error: err.message });
  }
});

module.exports = router;
