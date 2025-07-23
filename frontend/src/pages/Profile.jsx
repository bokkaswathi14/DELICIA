import React, { useState, useEffect } from 'react';
import { User, Calendar, ChefHat, Edit3, Trash2, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { recipeService } from '../services/recipeService';
import { RecipeCard } from '../components/Recipe/RecipeCard';
import { RecipeModal } from '../components/Recipe/RecipeModal';

export const Profile = () => {
  const { user, updateUser } = useAuth();
  const [userRecipes, setUserRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(user?.profilePicture || '');

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: user.name, email: user.email });
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  useEffect(() => {
    if (user) {
      const recipes = recipeService.getRecipesByAuthor(user.id);
      setUserRecipes(recipes);
      setProfilePic(user.profilePicture || '');
    }
  }, [user]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      const updatedUser = { ...user, profilePicture: base64 };
      localStorage.setItem('delicia_user', JSON.stringify(updatedUser));
      setProfilePic(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      await updateUser(formData);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const handleDeleteRecipe = (recipeId) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      recipeService.deleteRecipe(recipeId);
      setUserRecipes(userRecipes.filter(recipe => recipe.id !== recipeId));
    }
  };

  const filteredRecipes = userRecipes
    .filter(recipe => {
      const matchesCategory = filter ? recipe.category === filter : true;
      const matchesFavorites = favoritesOnly ? user.favorites?.includes(recipe.id) : true;
      return matchesCategory && matchesFavorites;
    })
    .sort((a, b) => {
      if (sort === 'cookTime') return a.cookTime - b.cookTime;
      if (sort === 'difficulty') return a.difficulty.localeCompare(b.difficulty);
      return 0;
    });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Please log in to view your profile</h2>
          <p className="text-gray-600 text-lg">You need to be logged in to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">Profile</h1>

          <div className="flex items-center space-x-8">
            <div className="relative">
              <label className="cursor-pointer">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-2xl object-cover shadow-lg" />
                ) : (
                  <div className="w-24 h-24 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <User className="h-12 w-12" />
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>

            <div className="flex-1">
              {editMode ? (
                <div className="space-y-2">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full dark:bg-gray-700"
                  />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full dark:bg-gray-700"
                  />
                  <div className="flex space-x-2 mt-2">
                    <button onClick={handleSaveProfile} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                    <button onClick={() => setEditMode(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold">{user.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
                  <div className="flex items-center space-x-6 mt-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 space-x-2">
                      <ChefHat className="w-4 h-4" />
                      <span>{userRecipes.length} Recipe{userRecipes.length !== 1 ? 's' : ''}</span>
                    </div>
                    <button onClick={() => setEditMode(true)} className="text-sm text-blue-600 hover:underline ml-4 flex items-center">
                      <Edit3 className="w-4 h-4 mr-1" /> Edit Profile
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center gap-4">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded dark:bg-gray-700">
          <option value="">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)} className="p-2 border rounded dark:bg-gray-700">
          <option value="">Sort By</option>
          <option value="cookTime">Cook Time</option>
          <option value="difficulty">Difficulty</option>
        </select>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={favoritesOnly}
            onChange={() => setFavoritesOnly(prev => !prev)}
          />
          <Heart className="w-4 h-4 text-red-500" />
          Favorites
        </label>
      </div>

      {/* Recipes Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredRecipes.map((recipe) => (
              <div key={recipe.id} className="relative group">
                <RecipeCard recipe={recipe} onClick={() => handleRecipeClick(recipe)} />

                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Edit recipe:', recipe.id);
                      }}
                      className="p-2 bg-white/95 text-gray-700 rounded-xl hover:text-orange-600 shadow-lg"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRecipe(recipe.id);
                      }}
                      className="p-2 bg-white/95 text-gray-700 rounded-xl hover:text-red-600 shadow-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <ChefHat className="w-12 h-12 mx-auto text-orange-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No recipes yet</h3>
            <p className="text-gray-600 mb-6">Start sharing your delicious creations!</p>
            <a href="/add-recipe" className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 shadow-lg font-medium">
              <ChefHat className="h-5 w-5 mr-2 inline" /> Add Recipe
            </a>
          </div>
        )}
      </div>

      {/* Modal */}
      <RecipeModal recipe={selectedRecipe} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};
