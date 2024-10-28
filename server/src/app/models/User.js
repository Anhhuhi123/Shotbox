import db from '../../config/database.js';

const User = {
    getAllUsers: async () => {
        const query = 'SELECT * FROM Users';
        const [rows] = await db.query(query);
        return rows;
    },
    findByUsername: async (data) => {
        const username = data;
        const query = 'SELECT * FROM Users WHERE name = ?';
        const [rows] = await db.query(query, [username]);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    },
    findByEmail: async (data) => {
        const email = data;
        const query = 'SELECT * FROM Users WHERE email = ?';
        const [rows] = await db.query(query, [email]);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    },
    create: async (data) => {
        const { username, email, password, roldid } = data; 
        const query = 'INSERT INTO Users (name, email, password, roldid) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [username, email, password, roldid]);
        return result.insertId;
    },
}

export default User;
