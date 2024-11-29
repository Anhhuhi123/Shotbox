import db from '../../config/database.js';

const User = {
    getAllUsers: async () => {
        try {
            const query = 'SELECT * FROM users';
            const [rows] = await db.query(query);
            return rows;
        } catch (error) {
            console.error('Error fetching usernames:', error);
            throw new Error('Failed to fetch usernames'); // Tùy chọn: Ném lỗi để xử lý ở tầng gọi
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
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.query(query, [email]);
        return rows.length > 0 ? rows[0] : null;
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
    update: async (userId, data) => {
        try {
            const { name, email, password, roleId } = data;
            const query = `
            UPDATE users 
            SET  email = ?, password = ? WHERE id = ?
             `;
            const [result] = await db.query(query, [
                email,
                password,
                userId
            ]);

            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Unable to update user.");
        }
    },
    updateRoleId: async (newRoleId, userId) => {
        try {
            // Kiểm tra xem newRoleId và userId có hợp lệ không
            if (!newRoleId || !userId) {
                throw new Error('Missing newRoleId or userId');
            }

            // Truy vấn SQL để cập nhật RoleId
            const query = 'UPDATE users SET roleId = ? WHERE id = ?';
            const [result] = await db.query(query, [newRoleId, userId]);

            // Kiểm tra xem có ảnh hưởng dòng dữ liệu nào không
            if (result.affectedRows > 0) {
                return { success: true, message: 'Role updated successfully' };
            } else {
                throw new Error('User not found or RoleId is the same');
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    },
    updateCapacity: async (newCapacity, userId) => {
        try {
            // Kiểm tra xem newCapacity và userId có hợp lệ không
            if (!newCapacity || !userId) {
                throw new Error('Missing newCapacity or userId');
            }
            // Kiểm tra xem newCapacity có phải là một số hợp lệ không
            if (isNaN(newCapacity) || newCapacity <= 0) {
                throw new Error('Invalid newCapacity value');
            }
            const query = 'UPDATE users SET capacity = ? WHERE id = ?';
            const [result] = await db.query(query, [newCapacity, userId]);
            if (result.affectedRows > 0) {
                return { success: true, message: 'Capacity updated successfully' };
            } else {
                throw new Error('User not found or capacity is the same');
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }
};

export default User;
