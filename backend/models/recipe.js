// models/Recipe.js
const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  imageUrl: {type: String, required: true},
  category: {type: String, required: true},
  ingredients: {type: [String], required: true},
  instructions: {type: [String], required: true},
  cookTime: Number,
  servings: Number,
  difficulty: String,
  nutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
  },
  authorId: {type: String, required: true},
  authorName: {type: String, required: true},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Recipe', RecipeSchema);
