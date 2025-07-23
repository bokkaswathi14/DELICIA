import { mockRecipes } from '../data/mockRecipes';

class RecipeService {
  getRecipes() {
    const stored = localStorage.getItem('delicia_recipes');
    if (!stored) {
      localStorage.setItem('delicia_recipes', JSON.stringify(mockRecipes));
      return mockRecipes;
    }
    return JSON.parse(stored);
  }

  saveRecipes(recipes) {
    localStorage.setItem('delicia_recipes', JSON.stringify(recipes));
  }

  getAllRecipes() {
    return this.getRecipes();
  }

  getRecipesByCategory(category) {
    return this.getRecipes().filter(recipe =>
      recipe.category.toLowerCase() === category.toLowerCase()
    );
  }

  getRecipesByAuthor(authorId) {
    return this.getRecipes().filter(recipe => recipe.authorId === authorId);
  }

  searchRecipes(query) {
    const recipes = this.getRecipes();
    const searchTerm = query.toLowerCase();

    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm) ||
      recipe.category.toLowerCase().includes(searchTerm) ||
      recipe.ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(searchTerm)
      )
    );
  }

  getRecipeById(id) {
    return this.getRecipes().find(recipe => recipe.id === id);
  }

  createRecipe(recipe) {
    const recipes = this.getRecipes();
    const newRecipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    recipes.unshift(newRecipe);
    this.saveRecipes(recipes);
    return newRecipe;
  }

  updateRecipe(id, updates) {
    const recipes = this.getRecipes();
    const index = recipes.findIndex(recipe => recipe.id === id);

    if (index === -1) return null;

    recipes[index] = { ...recipes[index], ...updates };
    this.saveRecipes(recipes);
    return recipes[index];
  }

  deleteRecipe(id) {
    const recipes = this.getRecipes();
    const filteredRecipes = recipes.filter(recipe => recipe.id !== id);

    if (filteredRecipes.length === recipes.length) return false;

    this.saveRecipes(filteredRecipes);
    return true;
  }

  getCategories() {
    const recipes = this.getRecipes();
    const categories = [...new Set(recipes.map(recipe => recipe.category))];
    return categories.sort();
  }
}

export const recipeService = new RecipeService();
