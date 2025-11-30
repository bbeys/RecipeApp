const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'users.json');

function readAll() {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) || [];
  } catch (e) {
    return [];
  }
}

function writeAll(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
}

function findById(id) {
  const users = readAll();
  return users.find(u => Number(u.id) === Number(id));
}

function findByEmail(email) {
  const users = readAll();
  return users.find(u => u.email === email);
}

function updateUser(id, payload) {
  const users = readAll();
  const idx = users.findIndex(u => Number(u.id) === Number(id));
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...payload };
  writeAll(users);
  return users[idx];
}

module.exports = {
  readAll,
  writeAll,
  findById,
  findByEmail,
  updateUser,
};
