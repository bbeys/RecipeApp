// Recipe class with OOP principles
const Storage = require('../services/storage');
const storage = new Storage('recipes.json');

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

    // Getter methods
    async getRecipeDetails() {
        if (!this.title) {
            const results = await storage.query(r => Number(r.id) === Number(this.id));
            if (results && results.length > 0) {
                const data = results[0];
                this.title = data.title;
                this.ingredients = data.ingredients || [];
                this.dietary = data.dietary || [];
                this.mealType = data.mealType || [];
                this.cuisine = data.cuisine || [];
                this.prepTime = data.prepTime;
                this.instructions = data.instructions;
            }
        }
    }

    // Setter methods
    setTitle(title) {
        this.title = title;
    }

    setIngredients(ingredients) {
        this.ingredients = Array.isArray(ingredients) ? ingredients : [];
    }

    setDietary(dietary) {
        this.dietary = Array.isArray(dietary) ? dietary : [];
    }

    setMealType(mealType) {
        this.mealType = Array.isArray(mealType) ? mealType : [];
    }

    setCuisine(cuisine) {
        this.cuisine = Array.isArray(cuisine) ? cuisine : [];
    }

    setPrepTime(prepTime) {
        this.prepTime = prepTime;
    }

    setInstructions(instructions) {
        this.instructions = instructions;
    }

    // Save the recipe (for updates)
    async save() {
        const recipes = await storage.read();
        const idx = recipes.findIndex(r => Number(r.id) === Number(this.id));
        if (idx !== -1) {
            recipes[idx] = {
                id: this.id,
                title: this.title,
                ingredients: this.ingredients,
                dietary: this.dietary,
                mealType: this.mealType,
                cuisine: this.cuisine,
                prepTime: this.prepTime,
                instructions: this.instructions
            };
            await storage.write(recipes);
            return true;
        }
        return false;
    }
}

// Static helper functions (outside class but use Recipe class)
async function getAllRecipes() {
    const results = await storage.query();
    const recipes = [];
    for (const row of results) {
        const recipe = new Recipe(row.id);
        recipe.setTitle(row.title);
        recipe.setIngredients(row.ingredients);
        recipe.setDietary(row.dietary);
        recipe.setMealType(row.mealType);
        recipe.setCuisine(row.cuisine);
        recipe.setPrepTime(row.prepTime);
        recipe.setInstructions(row.instructions);
        recipes.push(recipe);
    }
    return recipes;
}

async function addRecipe(recipeData) {
    const recipes = await storage.read();
    const nextId = recipes.reduce((max, r) => Math.max(max, r.id || 0), 0) + 1;
    const newRecipe = {
        id: nextId,
        title: recipeData.title,
        ingredients: recipeData.ingredients || [],
        dietary: recipeData.dietary || [],
        mealType: recipeData.mealType || [],
        cuisine: recipeData.cuisine || [],
        prepTime: recipeData.prepTime || '',
        instructions: recipeData.instructions || ''
    };
    recipes.push(newRecipe);
    await storage.write(recipes);
    return newRecipe;
}

async function deleteRecipe(id) {
    const recipes = await storage.read();
    const filtered = recipes.filter(r => Number(r.id) !== Number(id));
    await storage.write(filtered);
    return true;
}

module.exports = {
    Recipe,
    getAllRecipes,
    addRecipe,
    deleteRecipe
};
