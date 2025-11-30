// User class with OOP principles
const Storage = require('../services/storage');
const storage = new Storage('users.json');

class User {
    id;
    name;
    email;
    password;
    role;
    avatar;
    favorites = [];

    constructor(id) {
        this.id = id;
    }

    // Getter methods
    async getUserDetails() {
        if (!this.name) {
            const results = await storage.query(u => Number(u.id) === Number(this.id));
            if (results && results.length > 0) {
                const data = results[0];
                this.name = data.name;
                this.email = data.email;
                this.password = data.password;
                this.role = data.role;
                this.avatar = data.avatar;
                this.favorites = data.favorites || [];
            }
        }
    }

    // Setter methods
    setName(name) {
        this.name = name;
    }

    setEmail(email) {
        this.email = email;
    }

    setPassword(password) {
        this.password = password;
    }

    setRole(role) {
        this.role = role;
    }

    setAvatar(avatar) {
        this.avatar = avatar;
    }

    setFavorites(favorites) {
        this.favorites = Array.isArray(favorites) ? favorites : [];
    }

    // Save the user (for updates)
    async save() {
        const users = await storage.read();
        const idx = users.findIndex(u => Number(u.id) === Number(this.id));
        if (idx !== -1) {
            users[idx] = {
                id: this.id,
                name: this.name,
                email: this.email,
                password: this.password,
                role: this.role,
                avatar: this.avatar,
                favorites: this.favorites
            };
            await storage.write(users);
            return true;
        }
        return false;
    }

    // Check if user is admin
    isAdmin() {
        return this.role === 'admin';
    }
}

// Static helper functions (outside class but use User class)
async function getAllUsers() {
    const results = await storage.query();
    const users = [];
    for (const row of results) {
        const user = new User(row.id);
        user.setName(row.name);
        user.setEmail(row.email);
        user.setPassword(row.password);
        user.setRole(row.role);
        user.setAvatar(row.avatar);
        user.setFavorites(row.favorites || []);
        users.push(user);
    }
    return users;
}

async function findUserByEmail(email) {
    const results = await storage.query(u => u.email === email);
    if (results && results.length > 0) {
        const row = results[0];
        const user = new User(row.id);
        user.setName(row.name);
        user.setEmail(row.email);
        user.setPassword(row.password);
        user.setRole(row.role);
        user.setAvatar(row.avatar);
        user.setFavorites(row.favorites || []);
        return user;
    }
    return null;
}

async function findUserById(id) {
    const user = new User(id);
    await user.getUserDetails();
    return user.name ? user : null;
}

module.exports = {
    User,
    getAllUsers,
    findUserByEmail,
    findUserById
};
