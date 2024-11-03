import db from '../../config/database.js'
const User = {
    getAllUsername: async () => {
        const query = 'SELECT * FROM users';
        const [rows] = await db.query(query);
        return rows;
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
            console.error("Error fetching user by username:", error); // Log lỗi chi tiết
            throw new Error("Unable to find user.");
        }
    },
    findByEmail: async (data) => {
        const email = data;
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.query(
            query, [email]
        );
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    },
    create: async (data) => {
        try {
            const { username, email, password } = data;
            const roleId = 2;
            const query = 'INSERT INTO users (name, email, password, roleId) VALUES (?, ?, ?, ?)';
            const [result] = await db.query(query, [username, email, password, roleId]);

            return result.insertId;
        } catch (error) {
            console.error("Error creating user:", error); // Log lỗi chi tiết
            throw new Error("Unable to create user.");
        }
    }
}

export default User;