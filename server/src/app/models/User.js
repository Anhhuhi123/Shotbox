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
            // const query = `
            //     UPDATE users 
            //     SET name = ?, email = ?, password = COALESCE(?, password), roleId = ?
            //     WHERE id = ?
            // `;
            const query = `
            UPDATE users 
            SET  email = ?, password = ? WHERE id = ?
             `;
            const [result] = await db.query(query, [
                // name, 
                email,
                password,  // Sử dụng mật khẩu đã mã hóa (hoặc giữ nguyên nếu không có mật khẩu mới)
                // roleId, 
                userId
            ]);

            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Unable to update user.");
        }
    },

    // Kiểm tra xem vai trò hiện tại của user đang đăng nhập
    checkRoleId: async (id) => {
        const query = 'SELECT roleId FROM users WHERE id = ?';
        const [result] = await db.query(query, [id]);
    
        if (result.length === 0) {
            throw new Error('User not found');
        }
    
        const roleId = result[0].roleId;
        console.log(roleId);
    
        if (roleId === 1) {
            return 'admin';
        } else if (roleId === 2) {
            return 'user';
        } else {
            throw new Error('Unknown role');
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
    }

};

export default User;
