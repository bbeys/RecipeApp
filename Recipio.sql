-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 30, 2025 at 09:51 PM
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
(1, 'admin@recipeapp.com', 'recipioadmin', '2025-11-30 20:04:58'),
(2, 'priya@example.com', 'adminpass', '2025-11-30 20:23:09');

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
(27, 'Corn', 'Vegetable');

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
(5, 5, 'Sauté vegetables and bake together in a dish until tender.'),
(6, 6, 'Mix ingredients and cook on a hot griddle until golden brown.'),
(7, 7, 'Stuff peppers with rice and bean mixture, bake with tomato sauce.');

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
  `cuisine_type` enum('American','Asian','Chinese','French','Italian','Turkish','Middle Eastern','Mexican') NOT NULL,
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
(1, 1, 'Vegetarian Lasagna', 45, 30, 'Italian', 'Dinner', 0, 1, 0, 0, '2025-11-30 20:27:14'),
(2, 1, 'Vegan Lentil Soup', 30, 20, 'Turkish', 'Lunch', 1, 1, 1, 1, '2025-11-30 20:27:14'),
(3, 1, 'Gluten-Free Avocado Toast', 10, 5, 'American', 'Breakfast', 0, 1, 1, 1, '2025-11-30 20:27:14'),
(4, 1, 'Dairy-Free Chicken Stir Fry', 25, 15, 'Asian', 'Dinner', 0, 0, 0, 1, '2025-11-30 20:27:14'),
(5, 1, 'French Ratatouille', 40, 30, 'French', 'Dinner', 1, 1, 1, 1, '2025-11-30 20:27:14'),
(6, 1, 'Gluten-Free Pancakes', 20, 10, 'American', 'Breakfast', 0, 1, 1, 0, '2025-11-30 20:27:14'),
(7, 1, 'Vegan Stuffed Peppers', 35, 25, 'Mexican', 'Lunch', 1, 1, 0, 1, '2025-11-30 20:27:14');

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
(29, 7, 2, 1.00, 'cup');

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
(1, 'John', 'Doe', 'john.doe@example.com', '$2y$10$examplehashedpassword456', '2025-11-30 20:04:58', NULL),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '$2y$10$examplehashedpassword789', '2025-11-30 20:04:58', NULL),
(3, 'Alice', 'Johnson', 'alice.johnson@example.com', '$2y$10$examplehashedpassword101', '2025-11-30 20:04:58', NULL),
(4, 'Sara', 'Chen', 'sara@example.com', 'sarapass', '2025-11-30 20:21:01', NULL);

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
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `INGREDIENT`
--
ALTER TABLE `INGREDIENT`
  MODIFY `ingredient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `INSTRUCTION`
--
ALTER TABLE `INSTRUCTION`
  MODIFY `instruction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `RECIPES`
--
ALTER TABLE `RECIPES`
  MODIFY `recipe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `RECIPE_INGREDIENTS`
--
ALTER TABLE `RECIPE_INGREDIENTS`
  MODIFY `recipe_ingredient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `SAVED_RECIPES`
--
ALTER TABLE `SAVED_RECIPES`
  MODIFY `favourite_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `USERS`
--
ALTER TABLE `USERS`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
