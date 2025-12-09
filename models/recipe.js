const db = require('../services/database');

class Recipe {
    id;
    title;
    ingredients = [];
    dietary = [];
    mealType = [];
    cuisine = [];
    prepTime;
    instructions;

    constructor(id) {
        this.id = id;
    }

    async getRecipeDetails() {
        if (!this.title) {
            const [rows] = await db.query(
                `SELECT r.*, i.instruction_text
                FROM RECIPES r
                LEFT JOIN INSTRUCTION i ON r.recipe_id = i.recipe_id
                WHERE r.recipe_id = ?`,
                [this.id]
            );

            if (rows && rows.length > 0) {
                const data = rows[0];
                this.title = data.recipe_name;
                this.cuisine = [data.cuisine_type];
                this.mealType = [data.meal_type];
                this.prepTime = `${data.preparation_time} min`;
                this.instructions = data.instruction_text || '';

                // Build dietary array
                this.dietary = [];
                if (data.is_vegan) this.dietary.push('Vegan');
                if (data.is_vegetarian) this.dietary.push('Vegetarian');
                if (data.is_gluten_free) this.dietary.push('Gluten-Free');
                if (data.is_dairy_free) this.dietary.push('Dairy-Free');

                // Get ingredients
                const [ingredientRows] = await db.query(
                    `SELECT i.ingredient_name
                     FROM RECIPE_INGREDIENTS ri
                     JOIN INGREDIENT i ON ri.ingredient_id = i.ingredient_id
                     WHERE ri.recipe_id = ?`,
                    [this.id]
                );
                this.ingredients = ingredientRows.map(row => row.ingredient_name);
            }
        }
    }

    setTitle(title) { this.title = title; }
    setIngredients(ingredients) { this.ingredients = Array.isArray(ingredients) ? ingredients : []; }
    setDietary(dietary) { this.dietary = Array.isArray(dietary) ? dietary : []; }
    setMealType(mealType) { this.mealType = Array.isArray(mealType) ? mealType : []; }
    setCuisine(cuisine) { this.cuisine = Array.isArray(cuisine) ? cuisine : []; }
    setPrepTime(prepTime) { this.prepTime = prepTime; }
    setInstructions(instructions) { this.instructions = instructions; }

    async save() {
        try {
            const prepTimeNum = parseInt(this.prepTime) || 0;
            const isVegan = this.dietary.includes('Vegan') ? 1 : 0;
            const isVegetarian = this.dietary.includes('Vegetarian') ? 1 : 0;
            const isGlutenFree = this.dietary.includes('Gluten-Free') ? 1 : 0;
            const isDairyFree = this.dietary.includes('Dairy-Free') ? 1 : 0;

            await db.query(
                `UPDATE RECIPES SET recipe_name = ?, preparation_time = ?, cuisine_type = ?, 
                 meal_type = ?, is_vegan = ?, is_vegetarian = ?, is_gluten_free = ?, is_dairy_free = ?
                 WHERE recipe_id = ?`,
                [this.title, prepTimeNum, this.cuisine[0] || 'American', this.mealType[0] || 'Dinner',
                 isVegan, isVegetarian, isGlutenFree, isDairyFree, this.id]
            );

            await db.query('UPDATE INSTRUCTION SET instruction_text = ? WHERE recipe_id = ?', 
                [this.instructions, this.id]);
            return true;
        } catch (error) {
            console.error('Error saving recipe:', error);
            return false;
        }
    }
}

async function getAllRecipes() {
    const [rows] = await db.query(
        `SELECT r.*, i.instruction_text
        FROM RECIPES r
        LEFT JOIN INSTRUCTION i ON r.recipe_id = i.recipe_id
        ORDER BY r.recipe_id`
    );

    const recipes = [];
    for (const row of rows) {
        const recipe = new Recipe(row.recipe_id);
        recipe.setTitle(row.recipe_name);
        recipe.setCuisine([row.cuisine_type]);
        recipe.setMealType([row.meal_type]);
        recipe.setPrepTime(`${row.preparation_time} min`);
        recipe.setInstructions(row.instruction_text || '');

        const dietary = [];
        if (row.is_vegan) dietary.push('Vegan');
        if (row.is_vegetarian) dietary.push('Vegetarian');
        if (row.is_gluten_free) dietary.push('Gluten-Free');
        if (row.is_dairy_free) dietary.push('Dairy-Free');
        recipe.setDietary(dietary);

        const [ingredientRows] = await db.query(
            `SELECT i.ingredient_name FROM RECIPE_INGREDIENTS ri
             JOIN INGREDIENT i ON ri.ingredient_id = i.ingredient_id
             WHERE ri.recipe_id = ?`,
            [row.recipe_id]
        );
        recipe.setIngredients(ingredientRows.map(r => r.ingredient_name));

        recipes.push(recipe);
    }
    return recipes;
}

async function addRecipe(recipeData) {
    try {
        console.log('Adding recipe with data:', JSON.stringify(recipeData, null, 2));
        
        const prepTimeNum = parseInt(recipeData.prepTime) || 0;
        const dietary = Array.isArray(recipeData.dietary) ? recipeData.dietary : [];
        const isVegan = dietary.includes('Vegan') ? 1 : 0;
        const isVegetarian = dietary.includes('Vegetarian') ? 1 : 0;
        const isGlutenFree = dietary.includes('Gluten-Free') ? 1 : 0;
        const isDairyFree = dietary.includes('Dairy-Free') ? 1 : 0;

        const [result] = await db.query(
            `INSERT INTO RECIPES (created_by_admin_id, recipe_name, preparation_time, cooking_time,
             cuisine_type, meal_type, is_vegan, is_vegetarian, is_gluten_free, is_dairy_free)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [recipeData.adminId || 101, recipeData.title, prepTimeNum, 0, recipeData.cuisine[0] || 'American',
             recipeData.mealType[0] || 'Dinner', isVegan, isVegetarian, isGlutenFree, isDairyFree]
        );

        const newRecipeId = result.insertId;
        console.log('Recipe inserted with ID:', newRecipeId);

        await db.query('INSERT INTO INSTRUCTION (recipe_id, instruction_text) VALUES (?, ?)',
            [newRecipeId, recipeData.instructions || '']);

        for (const ingredientName of recipeData.ingredients) {
            let [ingRows] = await db.query('SELECT ingredient_id FROM INGREDIENT WHERE ingredient_name = ?', 
                [ingredientName]);

            let ingredientId;
            if (ingRows.length > 0) {
                ingredientId = ingRows[0].ingredient_id;
            } else {
                const [ingResult] = await db.query('INSERT INTO INGREDIENT (ingredient_name) VALUES (?)', 
                    [ingredientName]);
                ingredientId = ingResult.insertId;
            }

            await db.query('INSERT INTO RECIPE_INGREDIENTS (recipe_id, ingredient_id) VALUES (?, ?)',
                [newRecipeId, ingredientId]);
        }

        return { id: newRecipeId, title: recipeData.title };
    } catch (error) {
        console.error('Error adding recipe:', error);
        return null;
    }
}

async function deleteRecipe(id) {
    try {
        await db.query('DELETE FROM RECIPES WHERE recipe_id = ?', [id]);
        return true;
    } catch (error) {
        console.error('Error deleting recipe:', error);
        return false;
    }
}

module.exports = { Recipe, getAllRecipes, addRecipe, deleteRecipe };
