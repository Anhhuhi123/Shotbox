import User from '../models/User.js';
import express from 'express';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());

class UserController {
    // GET tất cả người dùng
    async getAllUser(req, res) {
        const users = await User.getAllUsername();
        return res.status(200).json({
            data: users
        });
    }

    // GET thông tin người dùng hiện tại
    async getUser(req, res) {
        return res.status(200).json(req.user);
    }

    // GET thông tin người dùng theo ID
    async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error("Error in getUserById:", error);
            res.status(500).json({ error: 'An error occurred while fetching the user.' });
        }
    }

    // PUT để cập nhật thông tin người dùng
    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const { currentPassword, newPassword, name, email, roleId } = req.body;

            // Tìm người dùng trong cơ sở dữ liệu
            const userExists = await User.findById(userId);
            if (!userExists) {
                return res.status(404).json({ error: 'User not found.' });
            }

            // Nếu có currentPassword, kiểm tra xem mật khẩu hiện tại có trùng khớp không
            if (currentPassword && !(await bcrypt.compare(currentPassword, userExists.password))) {
                return res.status(400).json({ error: 'Incorrect current password.' });
            }

            // Nếu có newPassword, mã hóa mật khẩu mới
            let hashedPassword = userExists.password; // Giữ mật khẩu cũ nếu không có mật khẩu mới
            // Có pass mới thì mã hoá rồi mới thêm
            if (newPassword) {
                hashedPassword = await bcrypt.hash(newPassword, 10);
            }

            // Chuẩn bị dữ liệu cập nhật
            const updatedData = {
                name: name || userExists.name, // Giữ giá trị cũ nếu không có giá trị mới
                email: email || userExists.email,
                password: hashedPassword,
                roleId: roleId || userExists.roleId,
            };

            // Cập nhật thông tin người dùng
            const updated = await User.update(userId, updatedData);
            if (updated) {
                return res.status(200).json({ message: 'User updated successfully.' });
            }

            return res.status(500).json({ error: 'Failed to update user.' });
        } catch (error) {
            console.error("Error in updateUser:", error);
            res.status(500).json({ error: 'An error occurred while updating the user.' });
        }
    }

    // DELETE để xóa người dùng
    deleteUser(req, res) {
        const userId = req.params.id;
        res.send(`DELETE request for user with ID: ${userId}`);
    }
}

export default new UserController();
