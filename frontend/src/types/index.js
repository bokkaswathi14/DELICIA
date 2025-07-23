// This file just provides structure references for developers — not actual enforcement

// Example structure for a user object
export const exampleUser = {
  id: 'user123',
  name: 'John Doe',
  email: 'john@example.com',
  profilePicture: 'https://example.com/profile.jpg', // optional
  createdAt: '2025-07-05T10:00:00Z',
};

// Example structure for a recipe object
export const exampleRecipe = {
  id: 'recipe123',
  title: 'Spaghetti Carbonara',
  description: 'A delicious and creamy Italian pasta dish.',
  imageUrl: 'https://example.com/image.jpg',
  category: 'Dinner',
  ingredients: ['Pasta', 'Eggs', 'Parmesan', 'Bacon'],
  instructions: ['Boil pasta', 'Cook bacon', 'Mix eggs with cheese', 'Combine all'],
  cookTime: 30,
  servings: 4,
  difficulty: 'Easy', // Can be 'Easy', 'Medium', or 'Hard'
  nutrition: {
    calories: 500,
    protein: 20,
    carbs: 50,
    fat: 25,
  },
  authorId: 'user123',
  authorName: 'John Doe',
  createdAt: '2025-07-05T10:00:00Z',
};

// Authentication context shape reference (used in React context)
export const exampleAuthContext = {
  user: null, // or an object like exampleUser
  login: async (email, password) => {
    // logic here
  },
  register: async (name, email, password) => {
    // logic here
  },
  logout: () => {
    // logic here
  },
  isLoading: false,
};
