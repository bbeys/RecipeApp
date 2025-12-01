const db = require('../services/database');

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

    async getUserDetails() {
        if (!this.name) {
            // Try USERS table first
            let [rows] = await db.query(
                'SELECT user_id as id, CONCAT(first_name, " ", last_name) as name, email, password_hash as password, "user" as role FROM USERS WHERE user_id = ?',
                [this.id]
            );
            
            // If not found, try ADMIN table
            if (!rows || rows.length === 0) {
                [rows] = await db.query(
                    'SELECT admin_id as id, email as name, email, password_hash as password, "admin" as role FROM ADMIN WHERE admin_id = ?',
                    [this.id]
                );
            }

            if (rows && rows.length > 0) {
                const data = rows[0];
                this.name = data.name;
                this.email = data.email;
                this.password = data.password;
                this.role = data.role;
                this.avatar = '';
                
                // Get favorites
                if (this.role === 'user') {
                    const [favs] = await db.query(
                        'SELECT recipe_id FROM SAVED_RECIPES WHERE user_id = ?',
                        [this.id]
                    );
                    this.favorites = favs.map(f => f.recipe_id);
                }
            }
        }
    }

    setName(name) { this.name = name; }
    setEmail(email) { this.email = email; }
    setPassword(password) { this.password = password; }
    setRole(role) { this.role = role; }
    setAvatar(avatar) { this.avatar = avatar; }
    setFavorites(favorites) { this.favorites = Array.isArray(favorites) ? favorites : []; }

    async save() {
        try {
            if (this.role === 'admin') {
                await db.query(
                    'UPDATE ADMIN SET email = ?, password_hash = ? WHERE admin_id = ?',
                    [this.email, this.password, this.id]
                );
            } else {
                const nameParts = this.name.split(' ');
                const firstName = nameParts[0] || '';
                const lastName = nameParts.slice(1).join(' ') || '';
                
                await db.query(
                    'UPDATE USERS SET first_name = ?, last_name = ?, email = ?, password_hash = ? WHERE user_id = ?',
                    [firstName, lastName, this.email, this.password, this.id]
                );
                
                // Update favorites
                await db.query('DELETE FROM SAVED_RECIPES WHERE user_id = ?', [this.id]);
                if (this.favorites && this.favorites.length > 0) {
                    const values = this.favorites.map(recipeId => [this.id, recipeId]);
                    await db.query('INSERT INTO SAVED_RECIPES (user_id, recipe_id) VALUES ?', [values]);
                }
            }
            return true;
        } catch (error) {
            console.error('Error saving user:', error);
            return false;
        }
    }

    isAdmin() {
        return this.role === 'admin';
    }
}

async function getAllUsers() {
    const [rows] = await db.query(
        `SELECT user_id as id, CONCAT(first_name, " ", last_name) as name, email, password_hash as password, "user" as role 
         FROM USERS 
         UNION 
         SELECT admin_id as id, email as name, email, password_hash as password, "admin" as role 
         FROM ADMIN`
    );
    
    const users = [];
    for (const row of rows) {
        const user = new User(row.id);
        user.setName(row.name);
        user.setEmail(row.email);
        user.setPassword(row.password);
        user.setRole(row.role);
        user.setAvatar('');
        users.push(user);
    }
    return users;
}

async function findUserByEmail(email) {
    let [rows] = await db.query(
        'SELECT user_id as id, CONCAT(first_name, " ", last_name) as name, email, password_hash as password, "user" as role FROM USERS WHERE email = ?',
        [email]
    );
    
    if (!rows || rows.length === 0) {
        [rows] = await db.query(
            'SELECT admin_id as id, email as name, email, password_hash as password, "admin" as role FROM ADMIN WHERE email = ?',
            [email]
        );
    }

    if (rows && rows.length > 0) {
        const row = rows[0];
        const user = new User(row.id);
        user.setName(row.name);
        user.setEmail(row.email);
        user.setPassword(row.password);
        user.setRole(row.role);
        user.setAvatar('');
        
        if (row.role === 'user') {
            const [favs] = await db.query('SELECT recipe_id FROM SAVED_RECIPES WHERE user_id = ?', [row.id]);
            user.setFavorites(favs.map(f => f.recipe_id));
        }
        
        return user;
    }
    return null;
}

async function findUserById(id) {
    const user = new User(id);
    await user.getUserDetails();
    return user.name ? user : null;
}

module.exports = { User, getAllUsers, findUserByEmail, findUserById };
