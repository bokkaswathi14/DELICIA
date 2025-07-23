import React from 'react';
import { Clock, Users, ChefHat } from 'lucide-react';

export const RecipeCard = ({ recipe, onClick }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  console.log('Image URL for', recipe.title, ':', recipe.imageUrl);


  return (
    <div 
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-100"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img 
          src={recipe.imageUrl || 'https://via.placeholder.com/400x250?text=No+Image'} 
          alt={recipe.title}
          className="w-full h-48 object-cover rounded-md"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
            {recipe.category}
          </span>
        </div>

        <h3 className="font-bold text-gray-900 mb-3 text-lg line-clamp-2 group-hover:text-orange-600 transition-colors">
          {recipe.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {recipe.description}
        </p>

        {/* Recipe Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.cookTime}m</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <ChefHat className="h-4 w-4" />
            <span className="truncate max-w-20">{recipe.authorName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
