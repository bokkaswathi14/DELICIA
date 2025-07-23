import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { recipeService } from '../services/recipeService';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

const categories = [
  'Breakfast', 'Lunch', 'Dinner', 'Dessert',
  'Snack', 'Appetizer', 'Soup', 'Salad',
  'Pizza', 'Pasta'
];

export const AddRecipe = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: '',
    cookTime: 30,
    servings: 4,
    difficulty : 'Easy' | 'Medium' | 'Hard'  });

  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);
  const [nutrition, setNutrition] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cookTime' || name === 'servings' ? parseInt(value) || 0 : value
    }));
  };

  const handleNutritionChange = (e) => {
    const { name, value } = e.target;
    setNutrition(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const updateIngredient = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateInstruction = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const removeInstruction = (index) => {
    if (instructions.length > 1) {
      setInstructions(instructions.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setError('');
    setIsLoading(true);

    // Validation
    if (!formData.title || !formData.description || !formData.category) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    const filteredIngredients = ingredients.filter(ingredient => ingredient.trim() !== '');
    const filteredInstructions = instructions.filter(instruction => instruction.trim() !== '');

    if (filteredIngredients.length === 0 || filteredInstructions.length === 0) {
      setError('Please add at least one ingredient and one instruction');
      setIsLoading(false);
      return;
    }

    try {
      const newRecipe = {
        ...formData,
        ingredients: filteredIngredients,
        instructions: filteredInstructions,
        nutrition,
        authorId: user.id,
        authorName: user.name,
      };

      recipeService.createRecipe(newRecipe);
      navigate('/profile');
    } catch (err) {
      setError('Failed to create recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="px-8 py-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">Add New Recipe</h1>
            <p className="text-gray-600 mt-2 text-lg">Share your delicious recipe with the community</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Basic Information */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                    Recipe Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter recipe title"
                  />
                </div>

               <div>
                 <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                 </label>
                 <div className="flex overflow-x-auto no-scrollbar space-x-2 py-2">
                   {categories.map((cat) => (
                     <button
                       key={cat}
                       type="button"
                       className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all
                         ${formData.category === cat
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-100'}`}
                       onClick={() =>
                         setFormData((prev) => ({
                           ...prev,
                           category: cat
                          }))
                         }
                        >
                          {cat}
                        </button>
                      ))}
                   </div>
                 </div>

               </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Describe your recipe"
                />
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="https://example.com/recipe-image.jpg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                  <label htmlFor="cookTime" className="block text-sm font-semibold text-gray-700 mb-2">
                    Cook Time (minutes)
                  </label>
                  <input
                    type="number"
                    id="cookTime"
                    name="cookTime"
                    min="1"
                    value={formData.cookTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="servings" className="block text-sm font-semibold text-gray-700 mb-2">
                    Servings
                  </label>
                  <input
                    type="number"
                    id="servings"
                    name="servings"
                    min="1"
                    value={formData.servings}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="difficulty" className="block text-sm font-semibold text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Ingredients</h2>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="flex items-center space-x-2 px-4 py-2 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add</span>
                </button>
              </div>

              <div className="space-y-4">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder={`Ingredient ${index + 1}`}
                    />
                    {ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="p-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Instructions</h2>
                <button
                  type="button"
                  onClick={addInstruction}
                  className="flex items-center space-x-2 px-4 py-2 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add</span>
                </button>
              </div>

              <div className="space-y-4">
                {instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold rounded-full flex items-center justify-center mt-2">
                      {index + 1}
                    </span>
                    <textarea
                      value={instruction}
                      onChange={(e) => updateInstruction(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder={`Step ${index + 1} instructions`}
                      rows={3}
                    />
                    {instructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInstruction(index)}
                        className="p-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors mt-1"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Nutrition Information (Optional)</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <label htmlFor="calories" className="block text-sm font-semibold text-gray-700 mb-2">
                    Calories
                  </label>
                  <input
                    type="number"
                    id="calories"
                    name="calories"
                    min="0"
                    value={nutrition.calories}
                    onChange={handleNutritionChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="protein" className="block text-sm font-semibold text-gray-700 mb-2">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    id="protein"
                    name="protein"
                    min="0"
                    value={nutrition.protein}
                    onChange={handleNutritionChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="carbs" className="block text-sm font-semibold text-gray-700 mb-2">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    id="carbs"
                    name="carbs"
                    min="0"
                    value={nutrition.carbs}
                    onChange={handleNutritionChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="fat" className="block text-sm font-semibold text-gray-700 mb-2">
                    Fat (g)
                  </label>
                  <input
                    type="number"
                    id="fat"
                    name="fat"
                    min="0"
                    value={nutrition.fat}
                    onChange={handleNutritionChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-8 border-t border-gray-200">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg text-lg font-semibold"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Creating Recipe...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    <span>Create Recipe</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};