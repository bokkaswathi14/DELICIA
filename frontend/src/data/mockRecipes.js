const mockRecipes = [
  {
    id: '1',
    title: 'Classic Margherita Pizza',
    description: 'A traditional Italian pizza with fresh tomatoes, mozzarella, and basil',
    imageUrl: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
    category: 'Pizza',
    ingredients: [
      '1 pizza dough',
      '1/2 cup marinara sauce',
      '8 oz fresh mozzarella',
      '1/4 cup fresh basil leaves',
      '2 tbsp olive oil',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat oven to 475°F (245°C)',
      'Roll out pizza dough on a floured surface',
      'Spread marinara sauce evenly over dough',
      'Add torn mozzarella pieces',
      'Drizzle with olive oil',
      'Bake for 12-15 minutes until golden',
      'Top with fresh basil before serving'
    ],
    cookTime: 25,
    servings: 4,
    difficulty: 'Easy',
    nutrition: {
      calories: 285,
      protein: 12,
      carbs: 36,
      fat: 11
    },
    authorId: 'admin',
    authorName: 'Chef Marco',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Creamy Tomato Basil Soup',
    description: 'Rich and comforting soup perfect for cold days',
    imageUrl: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg',
    category: 'Soup',
    ingredients: [
      '2 lbs fresh tomatoes',
      '1 onion, diced',
      '3 cloves garlic',
      '1 cup heavy cream',
      '1/4 cup fresh basil',
      '2 cups vegetable broth',
      'Salt and pepper'
    ],
    instructions: [
      'Sauté onion and garlic until fragrant',
      'Add tomatoes and cook until soft',
      'Pour in vegetable broth and simmer',
      'Blend until smooth',
      'Stir in cream and basil',
      'Season with salt and pepper',
      'Serve hot with crusty bread'
    ],
    cookTime: 35,
    servings: 6,
    difficulty: 'Easy',
    nutrition: {
      calories: 165,
      protein: 4,
      carbs: 12,
      fat: 12
    },
    authorId: 'admin',
    authorName: 'Chef Sarah',
    createdAt: '2024-01-14T15:30:00Z'
  },
  {
    id: '3',
    title: 'Chocolate Lava Cake',
    description: 'Decadent individual chocolate cakes with molten centers',
    imageUrl: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
    category: 'Dessert',
    ingredients: [
      '4 oz dark chocolate',
      '4 tbsp butter',
      '2 large eggs',
      '2 tbsp sugar',
      '2 tbsp flour',
      'Pinch of salt',
      'Butter for ramekins'
    ],
    instructions: [
      'Preheat oven to 425°F (220°C)',
      'Melt chocolate and butter together',
      'Whisk eggs and sugar until thick',
      'Combine chocolate mixture with eggs',
      'Fold in flour and salt',
      'Pour into buttered ramekins',
      'Bake 12-14 minutes until edges are firm',
      'Serve immediately'
    ],
    cookTime: 20,
    servings: 2,
    difficulty: 'Medium',
    nutrition: {
      calories: 380,
      protein: 8,
      carbs: 32,
      fat: 26
    },
    authorId: 'admin',
    authorName: 'Pastry Chef Emma',
    createdAt: '2024-01-13T12:00:00Z'
  },
  {
    id: '4',
    title: 'Grilled Salmon with Lemon Herbs',
    description: 'Perfectly grilled salmon with fresh herbs and lemon',
    imageUrl: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg',
    category: 'Dinner',
    ingredients: [
      '4 salmon fillets',
      '2 lemons',
      '2 tbsp olive oil',
      '2 tbsp fresh dill',
      '1 tbsp fresh parsley',
      '2 cloves garlic',
      'Salt and pepper'
    ],
    instructions: [
      'Preheat grill to medium-high heat',
      'Mix herbs, garlic, oil, and lemon juice',
      'Season salmon with salt and pepper',
      'Brush with herb mixture',
      'Grill 4-5 minutes per side',
      'Serve with lemon wedges',
      'Garnish with fresh herbs'
    ],
    cookTime: 15,
    servings: 4,
    difficulty: 'Easy',
    nutrition: {
      calories: 275,
      protein: 35,
      carbs: 2,
      fat: 14
    },
    authorId: 'admin',
    authorName: 'Chef Michael',
    createdAt: '2024-01-12T18:45:00Z'
  },
  {
    id: '5',
    title: 'Asian Chicken Stir Fry',
    description: 'Quick and healthy stir fry with colorful vegetables',
    imageUrl: 'https://images.pexels.com/photos/15797950/pexels-photo-15797950.jpeg',
    category: 'Dinner',
    ingredients: [
      '1 lb chicken breast, sliced',
      '2 cups mixed vegetables',
      '3 tbsp soy sauce',
      '2 tbsp sesame oil',
      '1 tbsp ginger, minced',
      '2 cloves garlic',
      '1 tbsp cornstarch',
      'Green onions for garnish'
    ],
    instructions: [
      'Heat oil in large wok or skillet',
      'Cook chicken until golden brown',
      'Remove chicken and set aside',
      'Stir fry vegetables until crisp-tender',
      'Return chicken to pan',
      'Add sauce and toss to combine',
      'Serve over rice',
      'Garnish with green onions'
    ],
    cookTime: 20,
    servings: 4,
    difficulty: 'Easy',
    nutrition: {
      calories: 245,
      protein: 28,
      carbs: 8,
      fat: 11
    },
    authorId: 'admin',
    authorName: 'Chef Lin',
    createdAt: '2024-01-11T19:20:00Z'
  },
  {
    id: '6',
    title: 'Mediterranean Quinoa Salad',
    description: 'Fresh and healthy salad with quinoa, vegetables, and feta',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    category: 'Salad',
    ingredients: [
      '1 cup quinoa',
      '1 cucumber, diced',
      '2 tomatoes, chopped',
      '1/2 red onion',
      '1/2 cup kalamata olives',
      '4 oz feta cheese',
      '1/4 cup olive oil',
      '2 tbsp lemon juice',
      'Fresh herbs'
    ],
    instructions: [
      'Cook quinoa according to package directions',
      'Let quinoa cool completely',
      'Dice cucumber and tomatoes',
      'Slice red onion thinly',
      'Combine all vegetables with quinoa',
      'Whisk together oil and lemon juice',
      'Toss salad with dressing',
      'Top with feta and herbs'
    ],
    cookTime: 25,
    servings: 6,
    difficulty: 'Easy',
    nutrition: {
      calories: 220,
      protein: 8,
      carbs: 25,
      fat: 10
    },
    authorId: 'admin',
    authorName: 'Chef Sofia',
    createdAt: '2024-01-10T14:15:00Z'
  },
  {
    id: '7',
    title: 'Butter Chicken (Murgh Makhani)',
    description: 'Creamy and rich North Indian curry with tender chicken in a tomato-based sauce',
    imageUrl: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Dinner',
    ingredients: [
      '1 lb boneless chicken, cut into pieces',
      '1 cup heavy cream',
      '1 can (14 oz) crushed tomatoes',
      '2 tbsp butter',
      '1 large onion, finely chopped',
      '4 garlic cloves, minced',
      '1 inch ginger, grated',
      '2 tsp garam masala',
      '1 tsp cumin powder',
      '1 tsp coriander powder',
      '1/2 tsp turmeric',
      '1/2 tsp red chili powder',
      'Salt to taste',
      'Fresh cilantro for garnish'
    ],
    instructions: [
      'Marinate chicken with salt, turmeric, and half the garam masala for 30 minutes.',
      'Heat butter in a large pan and sauté onions until golden brown.',
      'Add garlic and ginger, cook for 1 minute until fragrant.',
      'Add tomatoes and cook until they break down, about 10 minutes.',
      'Add remaining spices and cook for 2 minutes.',
      'Add marinated chicken and cook until done, about 15 minutes.',
      'Stir in heavy cream and simmer for 5 minutes.',
      'Garnish with fresh cilantro and serve with basmati rice or naan.'
    ],
    cookTime: 45,
    servings: 4,
    difficulty: 'Medium',
    nutrition: {
      calories: 420,
      protein: '32g',
      carbs: '12g',
      fat: '28g'
    },
    authorId: 'admin',
    authorName: 'Chef Sofia',
    createdAt: '2024-01-10T14:15:00Z'
  },
];
export { mockRecipes };