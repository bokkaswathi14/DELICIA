import React from 'react';

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-12">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
          selectedCategory === null
            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
            : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
        }`}
      >
        All Recipes
      </button>
      
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
