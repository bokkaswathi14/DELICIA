import React, { useState, useEffect } from 'react';
import { ChefHat, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { recipeService } from '../services/recipeService';
import { RecipeCard } from '../components/Recipe/RecipeCard';
import { RecipeModal } from '../components/Recipe/RecipeModal';
import { CategoryFilter } from '../components/Recipe/CategoryFilter';
import { mockRecipes } from '../data/mockRecipes'; // adjust path as needed


export const Home = ({ searchQuery }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
  setRecipes(mockRecipes);

  // Get unique categories from mockRecipes
  const categories = [...new Set(mockRecipes.map(recipe => recipe.category))];
  setCategories(categories);
}, []);


  useEffect(() => {
    let filtered = recipes;

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(recipe => recipe.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const searchTerm = searchQuery.toLowerCase();
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm) ||
        recipe.category.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm)
        )
      );
    }

    setFilteredRecipes(filtered);
  }, [recipes, selectedCategory, searchQuery]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const featuredRecipes = recipes.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {!searchQuery && (
        <section className="bg-gradient-to-br from-orange-50 to-orange-100/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                    Discover Your Next{' '}
                    <span className="text-orange-500">Favorite</span>{' '}
                    Recipe
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                    Explore our curated collection of delicious recipes from around 
                    the world. From quick weeknight dinners to elegant weekend treats.
                  </p>
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2 text-orange-600">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">Quick & Easy</span>
                  </div>
                  <div className="flex items-center space-x-2 text-orange-600">
                    <Users className="h-5 w-5" />
                    <span className="font-medium">Family Friendly</span>
                  </div>
                  <div className="flex items-center space-x-2 text-orange-600">
                    <Star className="h-5 w-5" />
                    <span className="font-medium">Top Rated</span>
                  </div>
                </div>

                <div className="text-center mt-8">
                   <h1 className="text-3xl font-bold">Welcome to Delicia!</h1>
                   <p className="mt-2 text-gray-600">Search and explore recipes from all over the world.</p>
                   <a href="/global-search" className="mt-4 inline-block px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                      Search Recipes Globally
                   </a>
                </div>
                
                {/* CTA Button */}
                <div className="pt-4">
                  <button 
                    onClick={() => document.getElementById('recipes-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl text-lg font-semibold"
                  >
                    <span>Start Cooking Today</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right Content - Hero Image */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" 
                    alt="Delicious healthy bowl"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Floating Stats Card */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{recipes.length}+ Recipes</div>
                      <div className="text-gray-600">Rated 5 stars</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Recipes */}
      {!searchQuery && featuredRecipes.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Featured Recipes
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our most popular and highly-rated recipes chosen by our community
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => handleRecipeClick(recipe)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Recipes Section */}
      <section id="recipes-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'All Recipes'}
              </h2>
              <p className="text-gray-600 text-lg">
                {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Recipe Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => handleRecipeClick(recipe)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
                <ChefHat className="h-10 w-10 text-orange-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No recipes found</h3>
              <p className="text-gray-600 text-lg">
                {searchQuery 
                  ? `No recipes match your search for "${searchQuery}"`
                  : selectedCategory 
                    ? `No recipes found in the ${selectedCategory} category`
                    : 'No recipes available at the moment'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};