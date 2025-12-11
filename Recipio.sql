-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 11, 2025 at 02:16 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Recipio`
--

-- --------------------------------------------------------

--
-- Table structure for table `ADMIN`
--

CREATE TABLE `ADMIN` (
  `admin_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ADMIN`
--

INSERT INTO `ADMIN` (`admin_id`, `email`, `password_hash`, `created_at`) VALUES
(101, 'priya@example.com', 'adminpass', '2025-11-30 20:23:09');

-- --------------------------------------------------------

--
-- Table structure for table `INGREDIENT`
--

CREATE TABLE `INGREDIENT` (
  `ingredient_id` int(11) NOT NULL,
  `ingredient_name` varchar(100) NOT NULL,
  `category` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `INGREDIENT`
--

INSERT INTO `INGREDIENT` (`ingredient_id`, `ingredient_name`, `category`) VALUES
(1, 'Lasagna noodles', 'Pasta'),
(2, 'Tomato sauce', 'Sauce'),
(3, 'Ricotta cheese', 'Dairy'),
(4, 'Spinach', 'Vegetable'),
(5, 'Lentils', 'Legume'),
(6, 'Carrots', 'Vegetable'),
(7, 'Onion', 'Vegetable'),
(8, 'Garlic', 'Vegetable'),
(9, 'Gluten-free bread', 'Bread'),
(10, 'Avocado', 'Fruit'),
(11, 'Lemon', 'Fruit'),
(12, 'Salt', 'Spice'),
(13, 'Chicken', 'Meat'),
(14, 'Broccoli', 'Vegetable'),
(15, 'Bell peppers', 'Vegetable'),
(16, 'Soy sauce', 'Sauce'),
(17, 'Zucchini', 'Vegetable'),
(18, 'Eggplant', 'Vegetable'),
(19, 'Tomatoes', 'Vegetable'),
(20, 'Olive oil', 'Oil'),
(21, 'Gluten-free flour', 'Flour'),
(22, 'Eggs', 'Dairy'),
(23, 'Milk', 'Dairy'),
(24, 'Baking powder', 'Baking'),
(25, 'Rice', 'Grain'),
(26, 'Black beans', 'Legume'),
(27, 'Corn', 'Vegetable'),
(28, 'coconut milk', NULL),
(29, 'green curry paste', NULL),
(30, 'tofu', NULL),
(31, 'bamboo shoots', NULL),
(32, 'Thai basil', NULL),
(33, 'vegetable oil', NULL),
(35, 'chickpeas', NULL),
(36, 'coconut cream', NULL),
(37, 'ginger', NULL),
(38, 'cumin', NULL),
(39, 'coriander', NULL),
(40, 'turmeric', NULL),
(41, 'garam masala', NULL),
(42, 'paprika', NULL),
(43, 'cilantro', NULL),
(44, 'corn tortillas', NULL),
(45, 'lettuce', NULL),
(46, 'lime', NULL),
(47, 'chili powder', NULL),
(50, 'miso paste', NULL),
(51, 'wakame seaweed', NULL),
(52, 'green onions', NULL),
(53, 'parsley', NULL),
(54, 'tahini', NULL),
(55, 'cucumber', NULL),
(56, 'cherry tomatoes', NULL),
(57, 'hummus', NULL),
(58, 'mushrooms', NULL),
(59, 'rice vinegar', NULL),
(60, 'cornstarch', NULL),
(61, 'noodles', NULL),
(62, 'quinoa', NULL),
(63, 'sweet potato', NULL),
(64, 'kale', NULL),
(65, 'cinnamon', NULL),
(66, 'raisins', NULL),
(67, 'dried apricots', NULL),
(68, 'almonds', NULL),
(69, 'couscous', NULL),
(70, 'vegetable broth', NULL),
(71, 'pizza dough', NULL),
(72, 'mozzarella cheese', NULL),
(73, 'basil', NULL),
(74, 'flour', NULL),
(75, 'paneer', NULL),
(76, 'butter', NULL),
(77, 'heavy cream', NULL),
(78, 'tomato puree', NULL),
(79, 'kashmiri chili powder', NULL),
(132, 'feta cheese', NULL),
(133, 'phyllo dough', NULL),
(134, 'dill', NULL),
(135, 'nutmeg', NULL),
(136, 'cheddar cheese', NULL),
(137, 'black pepper', NULL),
(138, 'fresh herbs', NULL),
(139, 'flour tortillas', NULL),
(140, 'monterey jack cheese', NULL),
(141, 'sour cream', NULL),
(142, 'salsa', NULL),
(143, 'arborio rice', NULL),
(144, 'white wine', NULL),
(145, 'parmesan cheese', NULL),
(146, 'salmon', NULL),
(147, 'asparagus', NULL),
(148, 'ground chicken', NULL),
(149, 'fish sauce', NULL),
(150, 'chili peppers', NULL),
(151, 'jasmine rice', NULL),
(152, 'shrimp', NULL),
(153, 'rice noodles', NULL),
(154, 'tamarind paste', NULL),
(155, 'bean sprouts', NULL),
(156, 'peanuts', NULL),
(157, 'chicken thighs', NULL),
(158, 'tabbouleh', NULL),
(159, 'pita bread', NULL),
(160, 'beef bones', NULL),
(161, 'beef sirloin', NULL),
(162, 'star anise', NULL),
(163, 'hoisin sauce', NULL),
(164, 'jalapeños', NULL),
(165, 'sesame oil', NULL),
(166, 'gochujang', NULL),
(167, 'mirin', NULL),
(168, 'sake', NULL),
(169, 'sesame seeds', NULL),
(170, 'ground beef', NULL),
(171, 'burger buns', NULL),
(172, 'pickles', NULL),
(173, 'ketchup', NULL),
(174, 'mustard', NULL),
(175, 'american cheese', NULL),
(176, 'fettuccine pasta', NULL),
(177, 'chicken breast', NULL),
(178, 'paella rice', NULL),
(179, 'chorizo', NULL),
(180, 'mussels', NULL),
(181, 'peas', NULL),
(182, 'chicken broth', NULL),
(183, 'sugar', NULL),
(184, 'vanilla extract', NULL),
(185, 'maple syrup', NULL),
(186, 'berries', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `INSTRUCTION`
--

CREATE TABLE `INSTRUCTION` (
  `instruction_id` int(11) NOT NULL,
  `recipe_id` int(11) DEFAULT NULL,
  `instruction_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `INSTRUCTION`
--

INSERT INTO `INSTRUCTION` (`instruction_id`, `recipe_id`, `instruction_text`) VALUES
(1, 1, 'Layer noodles with ricotta, spinach, and sauce. Bake for 30 minutes.'),
(2, 2, 'Cook lentils with chopped vegetables until soft. Blend if desired.'),
(3, 3, 'Toast bread, mash avocado with lemon and salt, spread on toast.'),
(4, 4, 'Stir fry chicken and vegetables in soy sauce until cooked through.'),
(5, 5, 'Saute vegetables and bake together in a dish until tender.'),
(6, 6, 'Mix ingredients and cook on a hot griddle until golden brown.'),
(7, 7, 'Stuff peppers with rice and bean mixture, bake with tomato sauce.'),
(8, 8, 'Heat 1 tbsp oil in a large pan over medium heat. Add green curry paste and cook for 1-2 minutes until fragrant. Pour in coconut milk and bring to a simmer. Add tofu cubes, bamboo shoots, and bell peppers. Simmer for 15 minutes. Add Thai basil leaves and cook for 2 more minutes. Season with salt. Serve hot with rice.'),
(9, 9, 'Heat oil in a large pan. Add diced onions and cook until golden. Add minced garlic, ginger, and all spices (cumin, coriander, turmeric, garam masala, paprika). Cook for 2 minutes. Add tomato sauce and coconut cream. Stir well. Add drained chickpeas and simmer for 20 minutes. Season with salt and garnish with cilantro. Serve with rice or naan.'),
(10, 10, 'Heat oil in a pan and sauté diced onions until soft. Add minced garlic and cook for 1 minute. Add drained black beans, cumin, chili powder, and paprika. Mash half the beans with a fork. Cook for 10 minutes. Warm corn tortillas. Fill with black bean mixture, top with diced tomatoes, lettuce, avocado slices, and lime juice. Serve immediately.'),
(11, 11, 'Bring 4 cups of water to a boil. Add wakame seaweed and let it rehydrate for 2 minutes. Add diced tofu and sliced green onions. In a small bowl, mix miso paste with a ladle of hot broth until smooth. Turn off heat and stir miso mixture into the soup (do not boil after adding miso). Serve immediately in bowls.'),
(12, 12, 'Soak chickpeas overnight, then drain. Blend chickpeas, onion, garlic, parsley, cumin, coriander, and salt until coarse. Form into small balls. Heat oil and fry falafel until golden (4-5 minutes each side). For the bowl: place cooked rice, cucumber slices, cherry tomatoes, lettuce, and hummus in a bowl. Top with falafel and drizzle with tahini sauce.'),
(13, 13, 'Heat oil in a wok over high heat. Add sliced garlic and ginger, stir for 30 seconds. Add broccoli, carrots, bell peppers, and mushrooms. Stir-fry for 5-7 minutes. Mix soy sauce, rice vinegar, and cornstarch with water. Pour into wok and cook until sauce thickens (2 minutes). Serve over rice or noodles.'),
(14, 14, 'Cook quinoa according to package directions. Roast sweet potato cubes with olive oil at 400°F for 20 minutes. Massage kale with lemon juice and salt. Assemble bowl: quinoa base, roasted sweet potato, massaged kale, chickpeas, avocado slices, and shredded carrots. Drizzle with tahini dressing made from tahini, lemon juice, garlic, and water.'),
(15, 15, 'Heat oil in a large pot. Sauté onions until soft. Add garlic, ginger, cumin, coriander, cinnamon, and paprika. Cook for 2 minutes. Add diced tomatoes, chickpeas, diced eggplant, zucchini, and carrots. Pour in vegetable broth. Add raisins and apricots. Simmer covered for 35 minutes. Garnish with cilantro and almonds. Serve with couscous.'),
(16, 16, 'Preheat oven to 475°F. Roll out pizza dough on a floured surface. Transfer to a pizza pan. Spread tomato sauce evenly. Add sliced fresh mozzarella cheese. Drizzle with olive oil and sprinkle with salt. Bake for 12-15 minutes until crust is golden and cheese is bubbly. Remove from oven and top with fresh basil leaves. Slice and serve hot.'),
(17, 17, 'Heat butter in a pan. Add onions and cook until golden. Add ginger-garlic paste and all spices (cumin, coriander, garam masala, kashmiri chili powder). Add tomato puree and cook for 10 minutes. Add heavy cream and mix well. Add paneer cubes and simmer for 10 minutes. Finish with a dollop of butter. Garnish with cilantro. Serve with naan or rice.'),
(28, 22, 'Preheat oven to 350°F. Sauté spinach until wilted, drain well. Mix spinach with feta cheese, ricotta, eggs, dill, and nutmeg. Layer phyllo sheets in a baking dish, brushing each with melted butter. Add spinach mixture, then cover with more buttered phyllo layers. Score the top into squares. Bake for 35 minutes until golden. Let cool 10 minutes before serving.'),
(29, 23, 'Beat 3 eggs with salt and pepper. Heat butter in a non-stick pan over medium heat. Pour eggs and swirl to spread evenly. When edges set but center is still soft, add grated cheese to one half. Fold omelette in half and cook for 1 more minute. Slide onto plate. Serve immediately.'),
(30, 24, 'Heat a large skillet over medium heat. Place one flour tortilla in the pan. Sprinkle shredded cheese (cheddar and monterey jack mix) evenly over half the tortilla. Add diced bell peppers and onions if desired. Fold tortilla in half. Cook for 2-3 minutes each side until golden and cheese melts. Cut into wedges. Serve with sour cream and salsa.'),
(31, 25, 'Heat vegetable broth and keep warm. In a large pan, melt butter and sauté sliced mushrooms until golden. Remove mushrooms. Add more butter, sauté onions until soft. Add arborio rice and stir for 2 minutes. Add white wine and stir until absorbed. Add broth one ladle at a time, stirring constantly, waiting for each addition to absorb before adding more (20-25 minutes). Stir in mushrooms, parmesan cheese, and butter. Season and serve.'),
(32, 26, 'Preheat grill to medium-high. Season salmon fillets with salt, pepper, and lemon juice. Toss asparagus with olive oil, salt, and pepper. Grill salmon skin-side down for 5-6 minutes, flip and cook 4 more minutes. Grill asparagus alongside for 8-10 minutes, turning occasionally. Serve salmon topped with fresh dill and lemon wedges.'),
(33, 27, 'Heat oil in a wok over high heat. Add minced garlic and sliced chili peppers, stir for 30 seconds. Add ground chicken and cook until no longer pink (5 minutes). Add fish sauce, soy sauce, and a pinch of sugar. Stir well. Add Thai basil leaves and stir until wilted (1 minute). Serve over jasmine rice with a fried egg on top if desired.'),
(34, 28, 'Soak rice noodles in warm water for 30 minutes. Heat oil in wok, scramble eggs and set aside. Add shrimp and cook until pink. Push to side, add garlic and cook 30 seconds. Add drained noodles, fish sauce, tamarind paste, and sugar. Toss for 3 minutes. Add bean sprouts, scrambled eggs, and peanuts. Toss together. Serve with lime wedges and cilantro.'),
(35, 29, 'Marinate chicken thighs in olive oil, lemon juice, garlic, cumin, paprika, cinnamon, and salt for at least 30 minutes. Preheat grill to medium-high. Grill chicken for 6-7 minutes per side until fully cooked and charred. Let rest 5 minutes. Serve with hummus and pita bread.'),
(36, 30, 'Toast star anise, cinnamon, and coriander. In a large pot, bring beef bones and water to boil, then simmer. Add toasted spices, ginger, onion. Simmer for 2 hours. Strain broth. Cook rice noodles separately. Slice beef very thin. To serve: place noodles in bowl, add raw beef slices, pour hot broth over. Top with bean sprouts, Thai basil, lime, jalapeños, and hoisin sauce.'),
(37, 31, 'Cook rice. Marinate beef in soy sauce, sesame oil, and garlic. Blanch spinach and bean sprouts separately. Sauté mushrooms and zucchini. Cook beef in a hot pan. Julienne carrots. Fry an egg. To assemble: place rice in bowl, arrange all vegetables and beef on top in sections. Top with fried egg. Serve with gochujang and sesame oil on the side. Mix everything together before eating.'),
(38, 32, 'Mix soy sauce, mirin, sake, and sugar in a bowl. Cut chicken thighs into bite-sized pieces. Heat oil in pan over medium-high heat. Cook chicken until golden (5 minutes per side). Pour teriyaki sauce over chicken and cook until sauce thickens and glazes the chicken (3-4 minutes). Sprinkle with sesame seeds. Serve over rice with steamed broccoli.'),
(39, 33, 'Mix ground beef with salt and pepper. Form into 4 patties. Heat grill or pan to high heat. Cook burgers 4 minutes per side for medium. Add cheese in last minute if desired. Toast burger buns. Assemble: bottom bun, lettuce, tomato, burger patty with cheese, pickles, onion, ketchup, mustard, top bun. Serve with fries.'),
(53, 48, 'Heat olive oil in a large paella pan. Brown chicken pieces, then remove. Add chorizo slices and cook until crispy. Add onion, bell peppers, and garlic. Add rice and stir to coat. Add saffron, paprika, and tomato sauce. Pour in chicken broth and boil. Arrange chicken, shrimp, and mussels on top. Simmer uncovered 25-30 minutes. Add peas in last 5 minutes. Let rest. Garnish with lemon and parsley.');

-- --------------------------------------------------------

--
-- Table structure for table `RECIPES`
--

CREATE TABLE `RECIPES` (
  `recipe_id` int(11) NOT NULL,
  `created_by_admin_id` int(11) DEFAULT NULL,
  `recipe_name` varchar(100) NOT NULL,
  `preparation_time` int(11) NOT NULL,
  `cooking_time` int(11) NOT NULL,
  `cuisine_type` varchar(50) DEFAULT NULL,
  `meal_type` enum('Breakfast','Lunch','Dinner','Snack') NOT NULL,
  `is_vegan` tinyint(1) DEFAULT 0,
  `is_vegetarian` tinyint(1) DEFAULT 0,
  `is_gluten_free` tinyint(1) DEFAULT 0,
  `is_dairy_free` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `RECIPES`
--

INSERT INTO `RECIPES` (`recipe_id`, `created_by_admin_id`, `recipe_name`, `preparation_time`, `cooking_time`, `cuisine_type`, `meal_type`, `is_vegan`, `is_vegetarian`, `is_gluten_free`, `is_dairy_free`, `created_at`) VALUES
(1, NULL, 'Vegetarian Lasagna', 45, 30, 'Italian', 'Dinner', 0, 1, 0, 0, '2025-11-30 20:27:14'),
(2, NULL, 'Vegan Lentil Soup', 30, 20, 'Turkish', 'Lunch', 1, 1, 1, 1, '2025-11-30 20:27:14'),
(3, NULL, 'Gluten-Free Avocado Toast', 10, 5, 'American', 'Breakfast', 0, 1, 1, 1, '2025-11-30 20:27:14'),
(4, NULL, 'Dairy-Free Chicken Stir Fry', 25, 15, 'Asian', 'Dinner', 0, 0, 0, 1, '2025-11-30 20:27:14'),
(5, NULL, 'French Ratatouille', 40, 30, 'French', 'Dinner', 1, 1, 1, 1, '2025-11-30 20:27:14'),
(6, NULL, 'Gluten-Free Pancakes', 20, 10, 'American', 'Breakfast', 0, 1, 1, 0, '2025-11-30 20:27:14'),
(7, NULL, 'Vegan Stuffed Peppers', 35, 25, 'Mexican', 'Lunch', 1, 1, 0, 1, '2025-11-30 20:27:14'),
(8, 101, 'Thai Green Curry', 30, 25, 'Thai', 'Dinner', 1, 1, 1, 1, '2025-12-11 00:45:13'),
(9, 101, 'Chickpea Tikka Masala', 35, 30, 'Indian', 'Dinner', 1, 1, 1, 1, '2025-12-11 00:45:13'),
(10, 101, 'Mexican Black Bean Tacos', 20, 15, 'Mexican', 'Dinner', 1, 1, 0, 1, '2025-12-11 00:45:13'),
(11, 101, 'Japanese Miso Soup', 15, 10, '', 'Lunch', 1, 1, 1, 1, '2025-12-11 00:45:13'),
(12, 101, 'Mediterranean Falafel Bowl', 40, 20, 'Mediterranean', 'Dinner', 1, 1, 0, 1, '2025-12-11 00:45:13'),
(13, 101, 'Chinese Vegetable Stir Fry', 25, 15, 'Chinese', 'Dinner', 1, 1, 0, 1, '2025-12-11 00:45:13'),
(14, 101, 'Vegan Buddha Bowl', 30, 25, 'American', 'Lunch', 1, 1, 1, 1, '2025-12-11 00:45:13'),
(15, 101, 'Moroccan Tagine', 45, 40, 'Moroccan', 'Dinner', 1, 1, 1, 1, '2025-12-11 00:45:13'),
(16, 101, 'Italian Margherita Pizza', 25, 15, 'Italian', 'Dinner', 0, 1, 0, 0, '2025-12-11 00:45:13'),
(17, 101, 'Indian Paneer Butter Masala', 35, 30, 'Indian', 'Dinner', 0, 1, 1, 0, '2025-12-11 00:45:13'),
(22, 101, 'Greek Spanakopita', 40, 35, 'Greek', 'Lunch', 0, 1, 0, 0, '2025-12-11 01:03:59'),
(23, 101, 'French Cheese Omelette', 10, 5, 'French', 'Breakfast', 0, 1, 1, 0, '2025-12-11 01:03:59'),
(24, 101, 'Mexican Cheese Quesadillas', 15, 10, 'Mexican', 'Lunch', 0, 1, 0, 0, '2025-12-11 01:03:59'),
(25, 101, 'Italian Mushroom Risotto', 35, 30, 'Italian', 'Dinner', 0, 1, 1, 0, '2025-12-11 01:03:59'),
(26, 101, 'Grilled Salmon with Asparagus', 25, 15, 'American', 'Dinner', 0, 0, 1, 1, '2025-12-11 01:03:59'),
(27, 101, 'Thai Basil Chicken', 20, 15, 'Thai', 'Dinner', 0, 0, 1, 1, '2025-12-11 01:03:59'),
(28, 101, 'Shrimp Pad Thai', 30, 20, 'Thai', 'Dinner', 0, 0, 1, 1, '2025-12-11 01:03:59'),
(29, 101, 'Lebanese Grilled Chicken', 35, 25, 'Lebanese', 'Dinner', 0, 0, 1, 1, '2025-12-11 01:04:00'),
(30, 101, 'Vietnamese Pho', 40, 120, 'Vietnamese', 'Lunch', 0, 0, 0, 1, '2025-12-11 01:04:00'),
(31, 101, 'Korean Bibimbap', 30, 20, 'Korean', 'Dinner', 0, 0, 0, 1, '2025-12-11 01:04:00'),
(32, 101, 'Japanese Teriyaki Chicken', 25, 20, 'Japanese', 'Dinner', 0, 0, 0, 1, '2025-12-11 01:04:00'),
(33, 101, 'Classic Beef Burger', 20, 15, 'American', 'Dinner', 0, 0, 0, 0, '2025-12-11 01:04:00'),
(34, 101, 'Chicken Alfredo Pasta', 30, 25, 'Italian', 'Dinner', 0, 0, 0, 0, '2025-12-11 01:04:00'),
(48, 101, 'Spanish Paella', 45, 40, 'Spanish', 'Dinner', 0, 0, 1, 1, '2025-12-11 01:04:31');

-- --------------------------------------------------------

--
-- Table structure for table `RECIPE_INGREDIENTS`
--

CREATE TABLE `RECIPE_INGREDIENTS` (
  `recipe_ingredient_id` int(11) NOT NULL,
  `recipe_id` int(11) DEFAULT NULL,
  `ingredient_id` int(11) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `RECIPE_INGREDIENTS`
--

INSERT INTO `RECIPE_INGREDIENTS` (`recipe_ingredient_id`, `recipe_id`, `ingredient_id`, `quantity`, `unit`) VALUES
(1, 1, 1, 12.00, 'sheets'),
(2, 1, 2, 2.00, 'cups'),
(3, 1, 3, 2.00, 'cups'),
(4, 1, 4, 1.00, 'cup'),
(5, 2, 5, 1.00, 'cup'),
(6, 2, 6, 2.00, 'medium'),
(7, 2, 7, 1.00, 'large'),
(8, 2, 8, 3.00, 'cloves'),
(9, 3, 9, 2.00, 'slices'),
(10, 3, 10, 1.00, 'ripe'),
(11, 3, 11, 1.00, 'wedge'),
(12, 3, 12, 1.00, 'pinch'),
(13, 4, 13, 500.00, 'g'),
(14, 4, 14, 1.00, 'cup'),
(15, 4, 15, 2.00, 'medium'),
(16, 4, 16, 3.00, 'tbsp'),
(17, 5, 17, 2.00, 'medium'),
(18, 5, 18, 1.00, 'large'),
(19, 5, 19, 3.00, 'large'),
(20, 5, 20, 3.00, 'tbsp'),
(21, 6, 21, 2.00, 'cups'),
(22, 6, 22, 2.00, 'large'),
(23, 6, 23, 1.50, 'cups'),
(24, 6, 24, 2.00, 'tsp'),
(25, 7, 15, 4.00, 'large'),
(26, 7, 25, 1.00, 'cup'),
(27, 7, 26, 1.00, 'can'),
(28, 7, 27, 1.00, 'cup'),
(29, 7, 2, 1.00, 'cup'),
(30, 8, 31, NULL, NULL),
(31, 8, 15, NULL, NULL),
(32, 8, 28, NULL, NULL),
(33, 8, 29, NULL, NULL),
(34, 8, 32, NULL, NULL),
(35, 8, 30, NULL, NULL),
(36, 8, 33, NULL, NULL),
(37, 9, 35, NULL, NULL),
(38, 9, 43, NULL, NULL),
(39, 9, 36, NULL, NULL),
(40, 9, 39, NULL, NULL),
(41, 9, 38, NULL, NULL),
(42, 9, 41, NULL, NULL),
(43, 9, 8, NULL, NULL),
(44, 9, 37, NULL, NULL),
(45, 9, 7, NULL, NULL),
(46, 9, 42, NULL, NULL),
(47, 9, 2, NULL, NULL),
(48, 9, 40, NULL, NULL),
(49, 9, 33, NULL, NULL),
(52, 10, 10, NULL, NULL),
(53, 10, 26, NULL, NULL),
(54, 10, 47, NULL, NULL),
(55, 10, 44, NULL, NULL),
(56, 10, 38, NULL, NULL),
(57, 10, 8, NULL, NULL),
(58, 10, 45, NULL, NULL),
(59, 10, 46, NULL, NULL),
(60, 10, 7, NULL, NULL),
(61, 10, 42, NULL, NULL),
(62, 10, 19, NULL, NULL),
(63, 10, 33, NULL, NULL),
(67, 11, 52, NULL, NULL),
(68, 11, 50, NULL, NULL),
(69, 11, 30, NULL, NULL),
(70, 11, 51, NULL, NULL),
(74, 12, 56, NULL, NULL),
(75, 12, 35, NULL, NULL),
(76, 12, 39, NULL, NULL),
(77, 12, 55, NULL, NULL),
(78, 12, 38, NULL, NULL),
(79, 12, 8, NULL, NULL),
(80, 12, 57, NULL, NULL),
(81, 12, 45, NULL, NULL),
(82, 12, 20, NULL, NULL),
(83, 12, 7, NULL, NULL),
(84, 12, 53, NULL, NULL),
(85, 12, 25, NULL, NULL),
(86, 12, 12, NULL, NULL),
(87, 12, 54, NULL, NULL),
(89, 13, 15, NULL, NULL),
(90, 13, 14, NULL, NULL),
(91, 13, 6, NULL, NULL),
(92, 13, 60, NULL, NULL),
(93, 13, 8, NULL, NULL),
(94, 13, 37, NULL, NULL),
(95, 13, 58, NULL, NULL),
(96, 13, 59, NULL, NULL),
(97, 13, 16, NULL, NULL),
(98, 13, 33, NULL, NULL),
(104, 14, 10, NULL, NULL),
(105, 14, 6, NULL, NULL),
(106, 14, 35, NULL, NULL),
(107, 14, 8, NULL, NULL),
(108, 14, 64, NULL, NULL),
(109, 14, 11, NULL, NULL),
(110, 14, 20, NULL, NULL),
(111, 14, 62, NULL, NULL),
(112, 14, 12, NULL, NULL),
(113, 14, 63, NULL, NULL),
(114, 14, 54, NULL, NULL),
(119, 15, 68, NULL, NULL),
(120, 15, 6, NULL, NULL),
(121, 15, 35, NULL, NULL),
(122, 15, 43, NULL, NULL),
(123, 15, 65, NULL, NULL),
(124, 15, 39, NULL, NULL),
(125, 15, 69, NULL, NULL),
(126, 15, 38, NULL, NULL),
(127, 15, 67, NULL, NULL),
(128, 15, 18, NULL, NULL),
(129, 15, 8, NULL, NULL),
(130, 15, 37, NULL, NULL),
(131, 15, 20, NULL, NULL),
(132, 15, 7, NULL, NULL),
(133, 15, 42, NULL, NULL),
(134, 15, 66, NULL, NULL),
(135, 15, 19, NULL, NULL),
(136, 15, 70, NULL, NULL),
(137, 15, 17, NULL, NULL),
(150, 16, 73, NULL, NULL),
(151, 16, 72, NULL, NULL),
(152, 16, 20, NULL, NULL),
(153, 16, 71, NULL, NULL),
(154, 16, 12, NULL, NULL),
(155, 16, 2, NULL, NULL),
(157, 17, 76, NULL, NULL),
(158, 17, 43, NULL, NULL),
(159, 17, 39, NULL, NULL),
(160, 17, 38, NULL, NULL),
(161, 17, 41, NULL, NULL),
(162, 17, 8, NULL, NULL),
(163, 17, 37, NULL, NULL),
(164, 17, 77, NULL, NULL),
(165, 17, 79, NULL, NULL),
(166, 17, 7, NULL, NULL),
(167, 17, 75, NULL, NULL),
(168, 17, 78, NULL, NULL),
(230, 22, 76, NULL, NULL),
(231, 22, 134, NULL, NULL),
(232, 22, 22, NULL, NULL),
(233, 22, 132, NULL, NULL),
(234, 22, 135, NULL, NULL),
(235, 22, 133, NULL, NULL),
(236, 22, 3, NULL, NULL),
(237, 22, 4, NULL, NULL),
(245, 23, 137, NULL, NULL),
(246, 23, 76, NULL, NULL),
(247, 23, 136, NULL, NULL),
(248, 23, 22, NULL, NULL),
(249, 23, 12, NULL, NULL),
(252, 24, 15, NULL, NULL),
(253, 24, 136, NULL, NULL),
(254, 24, 139, NULL, NULL),
(255, 24, 140, NULL, NULL),
(256, 24, 7, NULL, NULL),
(257, 24, 142, NULL, NULL),
(258, 24, 141, NULL, NULL),
(259, 25, 143, NULL, NULL),
(260, 25, 137, NULL, NULL),
(261, 25, 76, NULL, NULL),
(262, 25, 58, NULL, NULL),
(263, 25, 7, NULL, NULL),
(264, 25, 145, NULL, NULL),
(265, 25, 12, NULL, NULL),
(266, 25, 70, NULL, NULL),
(267, 25, 144, NULL, NULL),
(274, 26, 147, NULL, NULL),
(275, 26, 137, NULL, NULL),
(276, 26, 134, NULL, NULL),
(277, 26, 11, NULL, NULL),
(278, 26, 20, NULL, NULL),
(279, 26, 146, NULL, NULL),
(280, 26, 12, NULL, NULL),
(281, 27, 150, NULL, NULL),
(282, 27, 149, NULL, NULL),
(283, 27, 8, NULL, NULL),
(284, 27, 148, NULL, NULL),
(285, 27, 16, NULL, NULL),
(286, 27, 183, NULL, NULL),
(287, 27, 32, NULL, NULL),
(288, 27, 33, NULL, NULL),
(296, 28, 155, NULL, NULL),
(297, 28, 43, NULL, NULL),
(298, 28, 22, NULL, NULL),
(299, 28, 149, NULL, NULL),
(300, 28, 8, NULL, NULL),
(301, 28, 46, NULL, NULL),
(302, 28, 156, NULL, NULL),
(303, 28, 153, NULL, NULL),
(304, 28, 152, NULL, NULL),
(305, 28, 183, NULL, NULL),
(306, 28, 154, NULL, NULL),
(307, 28, 33, NULL, NULL),
(311, 29, 157, NULL, NULL),
(312, 29, 65, NULL, NULL),
(313, 29, 38, NULL, NULL),
(314, 29, 8, NULL, NULL),
(315, 29, 57, NULL, NULL),
(316, 29, 11, NULL, NULL),
(317, 29, 20, NULL, NULL),
(318, 29, 42, NULL, NULL),
(319, 29, 159, NULL, NULL),
(320, 29, 12, NULL, NULL),
(326, 30, 155, NULL, NULL),
(327, 30, 160, NULL, NULL),
(328, 30, 161, NULL, NULL),
(329, 30, 65, NULL, NULL),
(330, 30, 39, NULL, NULL),
(331, 30, 37, NULL, NULL),
(332, 30, 163, NULL, NULL),
(333, 30, 164, NULL, NULL),
(334, 30, 46, NULL, NULL),
(335, 30, 7, NULL, NULL),
(336, 30, 153, NULL, NULL),
(337, 30, 162, NULL, NULL),
(338, 30, 32, NULL, NULL),
(341, 31, 155, NULL, NULL),
(342, 31, 161, NULL, NULL),
(343, 31, 6, NULL, NULL),
(344, 31, 22, NULL, NULL),
(345, 31, 8, NULL, NULL),
(346, 31, 166, NULL, NULL),
(347, 31, 58, NULL, NULL),
(348, 31, 25, NULL, NULL),
(349, 31, 165, NULL, NULL),
(350, 31, 16, NULL, NULL),
(351, 31, 4, NULL, NULL),
(352, 31, 17, NULL, NULL),
(356, 32, 14, NULL, NULL),
(357, 32, 157, NULL, NULL),
(358, 32, 167, NULL, NULL),
(359, 32, 25, NULL, NULL),
(360, 32, 168, NULL, NULL),
(361, 32, 169, NULL, NULL),
(362, 32, 16, NULL, NULL),
(363, 32, 183, NULL, NULL),
(364, 32, 33, NULL, NULL),
(371, 33, 175, NULL, NULL),
(372, 33, 137, NULL, NULL),
(373, 33, 171, NULL, NULL),
(374, 33, 170, NULL, NULL),
(375, 33, 173, NULL, NULL),
(376, 33, 45, NULL, NULL),
(377, 33, 174, NULL, NULL),
(378, 33, 7, NULL, NULL),
(379, 33, 172, NULL, NULL),
(380, 33, 12, NULL, NULL),
(381, 33, 19, NULL, NULL),
(557, 48, 15, NULL, NULL),
(558, 48, 182, NULL, NULL),
(559, 48, 157, NULL, NULL),
(560, 48, 179, NULL, NULL),
(561, 48, 8, NULL, NULL),
(562, 48, 11, NULL, NULL),
(563, 48, 180, NULL, NULL),
(564, 48, 20, NULL, NULL),
(565, 48, 7, NULL, NULL),
(566, 48, 178, NULL, NULL),
(567, 48, 42, NULL, NULL),
(568, 48, 53, NULL, NULL),
(569, 48, 181, NULL, NULL),
(570, 48, 152, NULL, NULL),
(571, 48, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `SAVED_RECIPES`
--

CREATE TABLE `SAVED_RECIPES` (
  `favourite_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `recipe_id` int(11) DEFAULT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `USERS`
--

CREATE TABLE `USERS` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `USERS`
--

INSERT INTO `USERS` (`user_id`, `first_name`, `last_name`, `email`, `password_hash`, `created_at`, `last_login`) VALUES
(1, 'Sara', 'Chen', 'sara@example.com', 'sarapass', '2025-11-30 20:21:01', NULL),
(2, 'Jay', 'Lo', 'jaylo@mail.com', 'jaypass', '2025-11-30 20:21:01', NULL),
(3, 'West', 'Hill', 'semp4@icloud.com', 'westpass', '2025-11-30 20:21:01', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ADMIN`
--
ALTER TABLE `ADMIN`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `INGREDIENT`
--
ALTER TABLE `INGREDIENT`
  ADD PRIMARY KEY (`ingredient_id`),
  ADD UNIQUE KEY `ingredient_name` (`ingredient_name`),
  ADD KEY `idx_ingredient_name` (`ingredient_name`),
  ADD KEY `idx_ingredient_category` (`category`);

--
-- Indexes for table `INSTRUCTION`
--
ALTER TABLE `INSTRUCTION`
  ADD PRIMARY KEY (`instruction_id`),
  ADD UNIQUE KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `RECIPES`
--
ALTER TABLE `RECIPES`
  ADD PRIMARY KEY (`recipe_id`),
  ADD KEY `created_by_admin_id` (`created_by_admin_id`),
  ADD KEY `idx_recipes_dietary` (`is_vegan`,`is_vegetarian`,`is_gluten_free`,`is_dairy_free`),
  ADD KEY `idx_recipes_cuisine_meal` (`cuisine_type`,`meal_type`),
  ADD KEY `idx_recipes_prep_time` (`preparation_time`);

--
-- Indexes for table `RECIPE_INGREDIENTS`
--
ALTER TABLE `RECIPE_INGREDIENTS`
  ADD PRIMARY KEY (`recipe_ingredient_id`),
  ADD UNIQUE KEY `unique_recipe_ingredient` (`recipe_id`,`ingredient_id`),
  ADD KEY `idx_recipe_ingredients_ingredient` (`ingredient_id`);

--
-- Indexes for table `SAVED_RECIPES`
--
ALTER TABLE `SAVED_RECIPES`
  ADD PRIMARY KEY (`favourite_id`),
  ADD UNIQUE KEY `unique_user_recipe` (`user_id`,`recipe_id`),
  ADD KEY `recipe_id` (`recipe_id`),
  ADD KEY `idx_saved_recipes_user` (`user_id`);

--
-- Indexes for table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ADMIN`
--
ALTER TABLE `ADMIN`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `INGREDIENT`
--
ALTER TABLE `INGREDIENT`
  MODIFY `ingredient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=242;

--
-- AUTO_INCREMENT for table `INSTRUCTION`
--
ALTER TABLE `INSTRUCTION`
  MODIFY `instruction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `RECIPES`
--
ALTER TABLE `RECIPES`
  MODIFY `recipe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `RECIPE_INGREDIENTS`
--
ALTER TABLE `RECIPE_INGREDIENTS`
  MODIFY `recipe_ingredient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=572;

--
-- AUTO_INCREMENT for table `SAVED_RECIPES`
--
ALTER TABLE `SAVED_RECIPES`
  MODIFY `favourite_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `USERS`
--
ALTER TABLE `USERS`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `INSTRUCTION`
--
ALTER TABLE `INSTRUCTION`
  ADD CONSTRAINT `instruction_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `RECIPES` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `RECIPES`
--
ALTER TABLE `RECIPES`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`created_by_admin_id`) REFERENCES `ADMIN` (`admin_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `RECIPE_INGREDIENTS`
--
ALTER TABLE `RECIPE_INGREDIENTS`
  ADD CONSTRAINT `recipe_ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `RECIPES` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `recipe_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `INGREDIENT` (`ingredient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `SAVED_RECIPES`
--
ALTER TABLE `SAVED_RECIPES`
  ADD CONSTRAINT `saved_recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `USERS` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `saved_recipes_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `RECIPES` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
