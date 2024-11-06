import db from '../../config/database.js';

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
            console.error("Error fetching user by username:", error);
            throw new Error("Unable to find user.");
        }
    },


    findByEmail: async (email) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.query(query, [email]);
        return rows.length > 0 ? rows[0] : null;
    },

    create: async (data) => {
        try {
            const { username, email, password } = data;
            const roleId = 2;
            const query = 'INSERT INTO users (name, email, password, roleId) VALUES (?, ?, ?, ?)';
            const [result] = await db.query(query, [username, email, password, roleId]);
            return result.insertId;
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Unable to create user.");
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

    // Hàm cập nhật thông tin người dùng
    update: async (userId, data) => {
        try {
            const { name, email, password, roleId } = data;
            const query = `
                UPDATE users 
                SET name = ?, email = ?, password = COALESCE(?, password), roleId = ?
                WHERE id = ?
            `;
            const [result] = await db.query(query, [
                name, 
                email, 
                password,  // Sử dụng mật khẩu đã mã hóa (hoặc giữ nguyên nếu không có mật khẩu mới)
                roleId, 
                userId
            ]);

            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Unable to update user.");
        }
    }
};

export default User;
