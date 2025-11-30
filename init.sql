-- Create recipes table
CREATE TABLE IF NOT EXISTS recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  ingredients TEXT,
  dietary TEXT,
  mealType TEXT,
  cuisine TEXT,
  prepTime VARCHAR(50),
  instructions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  avatar VARCHAR(255),
  favorites TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample recipes
INSERT INTO recipes (title, ingredients, dietary, mealType, cuisine, prepTime, instructions) VALUES
('Vegetarian Lasagna', 'Lasagna noodles,Tomato sauce,Ricotta cheese,Spinach', 'Vegetarian', 'Dinner', 'Italian', '45 min', 'Layer noodles with ricotta, spinach, and sauce. Bake for 30 minutes.'),
('Vegan Lentil Soup', 'Lentils,Carrots,Onion,Garlic', 'Vegan,Gluten-Free', 'Lunch', 'Turkish,Middle Eastern', '30 min', 'Cook lentils with chopped vegetables until soft. Blend if desired.'),
('Gluten-Free Avocado Toast', 'Gluten-free bread,Avocado,Lemon,Salt', 'Gluten-Free,Dairy-Free', 'Breakfast,Snack', 'American', '10 min', 'Toast bread, mash avocado with lemon and salt, spread on toast.'),
('Dairy-Free Chicken Stir Fry', 'Chicken,Broccoli,Bell peppers,Soy sauce', 'Dairy-Free', 'Dinner', 'Asian,Chinese', '25 min', 'Stir fry chicken and vegetables in soy sauce until cooked through.'),
('French Ratatouille', 'Zucchini,Eggplant,Tomatoes,Olive oil', 'Vegan,Gluten-Free', 'Dinner,Lunch', 'French', '40 min', 'Sauté vegetables and bake together in a dish until tender.'),
('Gluten-Free Pancakes', 'Gluten-free flour,Eggs,Milk,Baking powder', 'Gluten-Free', 'Breakfast', 'American', '20 min', 'Mix ingredients and cook on a hot griddle until golden brown.'),
('Vegan Stuffed Peppers', 'Bell peppers,Rice,Black beans,Corn,Tomato sauce', 'Vegan,Dairy-Free', 'Lunch,Dinner', 'Mexican', '35 min', 'Stuff peppers with rice and bean mixture, bake with tomato sauce.');

-- Insert sample users
INSERT INTO users (name, email, password, role, avatar, favorites) VALUES
('Priya T.', 'priya@example.com', 'adminpass', 'admin', '', ''),
('Sara C.', 'sara@example.com', 'sarapass', 'user', '', '1,3,6');
