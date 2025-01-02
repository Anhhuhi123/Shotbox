import db from '../../config/database.js';

const User = {
    getAllUsers: async () => {
        try {
            const query = 'SELECT * FROM users';
            const [rows] = await db.query(query);
            return rows;
        } catch (error) {
            console.error('Error fetching usernames:', error);
            throw new Error('Failed to fetch usernames');
        }
    },
    findByUsername: async (username) => {
        try {
            const query = 'SELECT * FROM users WHERE name = ?';
            const [rows] = await db.query(query, [username]);
            if (rows.length > 0) {
                return rows[0];
            }
            return null;
        } catch (error) {
            console.error("Error fetching user by username:", error);
            throw new Error("Unable to find user.");
        }
    },
    findByEmail: async (email) => {
        try {
            const query = 'SELECT * FROM users WHERE email = ?';
            const [rows] = await db.query(query, [email]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Error fetching user by email:", error);
            throw new Error("Unable to find user.");
        }
    },
    findById: async (userId) => {
        try {
            const query = 'SELECT * FROM users WHERE id = ?';
            const [rows] = await db.query(query, [userId]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw new Error("Unable to find user.");
        }
    },
    create: async (data) => {
        try {
            const { username, email, password } = data;
            const roleId = 2;
            const capacity = 10;
            const query = 'INSERT INTO users (name, email, password, roleId, capacity) VALUES (?, ?, ?, ?, ?)';
            const [result] = await db.query(query, [username, email, password, roleId, capacity]);
            return result.insertId;
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Unable to create user.");
        }
    },
    update: async (userId, data) => {
        try {
            const { email, password } = data;
            const query = `
                UPDATE users 
                SET email = ?, password = ? WHERE id = ?
            `;
            const [result] = await db.query(query, [email, password, userId]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Unable to update user.");
        }
    },
    updateRoleId: async (newRoleId, selectUserId) => {
        try {
            const query = 'UPDATE users SET roleId = ? WHERE id = ?';
            const [result] = await db.query(query, [newRoleId, selectUserId]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating roleId:', error);
            throw new Error('Failed to update roleId. Please try again.');
        }
    },
    updateCapacity: async (newCapacity, userId) => {
        try {
            const query = 'UPDATE users SET capacity = ? WHERE id = ?';
            const [result] = await db.query(query, [newCapacity, userId]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating capacity:', error);
            throw new Error('Failed to update capacity. Please try again.');
        }
    },
};

export default User;
