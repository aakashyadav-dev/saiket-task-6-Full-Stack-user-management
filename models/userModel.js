const db = require('../config/db');

/**
 * User Model - Handles all user database operations
 * Uses parameterized queries to prevent SQL injection
 */
class UserModel {
    /**
     * Find all users
     * @returns {Promise<Array>} Array of all users
     */
    static async findAll() {
        const sql = 'SELECT id, name, email, age, created_at as createdAt FROM users ORDER BY id';
        return await db.query(sql);
    }

    /**
     * Find a user by ID
     * @param {string|number} id - User ID
     * @returns {Promise<Object|null>} User object or null if not found
     */
    static async findById(id) {
        const sql = 'SELECT id, name, email, age, created_at as createdAt FROM users WHERE id = ?';
        const results = await db.query(sql, [id]);
        return results.length > 0 ? results[0] : null;
    }

    /**
     * Find a user by email
     * @param {string} email - User email
     * @returns {Promise<Object|null>} User object or null if not found
     */
    static async findByEmail(email) {
        const sql = 'SELECT id, name, email, age, created_at as createdAt FROM users WHERE email = ?';
        const results = await db.query(sql, [email.toLowerCase()]);
        return results.length > 0 ? results[0] : null;
    }

    /**
     * Create a new user
     * @param {Object} userData - User data (name, email, age)
     * @returns {Promise<Object>} Created user object
     */
    static async create(userData) {
        const { name, email, age } = userData;
        const sql = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
        const result = await db.query(sql, [name, email.toLowerCase(), age]);
        
        // Return the created user
        return await this.findById(result.insertId);
    }

    /**
     * Update an existing user
     * @param {string|number} id - User ID
     * @param {Object} userData - Updated user data
     * @returns {Promise<Object|null>} Updated user object or null if not found
     */
    static async update(id, userData) {
        const { name, email, age } = userData;
        
        // Build dynamic update query
        const updates = [];
        const params = [];
        
        if (name !== undefined) {
            updates.push('name = ?');
            params.push(name);
        }
        if (email !== undefined) {
            updates.push('email = ?');
            params.push(email.toLowerCase());
        }
        if (age !== undefined) {
            updates.push('age = ?');
            params.push(age);
        }

        if (updates.length === 0) {
            return await this.findById(id);
        }

        const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
        params.push(id);
        
        await db.query(sql, params);
        
        // Return the updated user
        return await this.findById(id);
    }

    /**
     * Delete a user by ID
     * @param {string|number} id - User ID
     * @returns {Promise<boolean>} True if deleted, false if not found
     */
    static async delete(id) {
        const sql = 'DELETE FROM users WHERE id = ?';
        const result = await db.query(sql, [id]);
        return result.affectedRows > 0;
    }

    /**
     * Count total users
     * @returns {Promise<number>} Total number of users
     */
    static async count() {
        const sql = 'SELECT COUNT(*) as total FROM users';
        const results = await db.query(sql);
        return results[0].total;
    }

    /**
     * Check if email exists (excluding a specific user ID)
     * @param {string} email - Email to check
     * @param {number} excludeId - User ID to exclude from check
     * @returns {Promise<boolean>} True if email exists
     */
    static async emailExists(email, excludeId = null) {
        let sql = 'SELECT id FROM users WHERE email = ?';
        const params = [email.toLowerCase()];
        
        if (excludeId) {
            sql += ' AND id != ?';
            params.push(excludeId);
        }
        
        const results = await db.query(sql, params);
        return results.length > 0;
    }
}

module.exports = UserModel;