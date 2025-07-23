// controllers/recipeController.js
const Recipe = require('../models/recipe');

const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
};

const createRecipe = async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  res.status(201).json(recipe);
};

module.exports = { getAllRecipes, createRecipe };
