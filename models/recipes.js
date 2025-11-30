const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'recipes.json');

function readAll() {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) || [];
  } catch (e) {
    return [];
  }
}

function writeAll(recipes) {
  fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2), 'utf8');
}

function findById(id) {
  const recipes = readAll();
  return recipes.find(r => Number(r.id) === Number(id));
}

function addRecipe(recipe) {
  const recipes = readAll();
  const nextId = recipes.reduce((m, r) => Math.max(m, r.id || 0), 0) + 1;
  const newRec = { id: nextId, ...recipe };
  recipes.push(newRec);
  writeAll(recipes);
  return newRec;
}

function updateRecipe(id, updated) {
  const recipes = readAll();
  const idx = recipes.findIndex(r => Number(r.id) === Number(id));
  if (idx === -1) return null;
  recipes[idx] = { ...recipes[idx], ...updated };
  writeAll(recipes);
  return recipes[idx];
}

function deleteRecipe(id) {
  const recipes = readAll();
  const idx = recipes.findIndex(r => Number(r.id) === Number(id));
  if (idx === -1) return false;
  recipes.splice(idx, 1);
  writeAll(recipes);
  return true;
}

module.exports = {
  readAll,
  writeAll,
  findById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};
