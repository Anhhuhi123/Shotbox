import User from '../models/User.js';
import HistoryUpgrade from '../models/HistoryUpgrade.js';
import express from 'express';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());

class UserController {
    // GET tất cả người dùng
    async showAllUser(req, res) {
        try {
            const users = await User.getAllUsers();
            return res.status(200).json(
                users.map(user => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    roleId: user.roleId,
                    capacity: user.capacity
                }))
            );
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ message: 'Failed to fetch users' });
        }
    }

    async getRoleId(req, res) {
        try {
            const { id } = req.user;
            const userExists = await User.findById(id)

            if (!userExists) {
                return res.status(404).json({ error: 'User not found.' });
            }
            res.status(200).json({ roleId: userExists.roleId }); // Return only name and email
        } catch (error) {
            console.error("Error in getUser:", error);
            res.status(500).json({ error: 'An error occurred while fetching the user.' });
        }
    }
    // GET thông tin người dùng hiện tại
    async getUser(req, res) {
        try {
            const { id } = req.user;
            const userExists = await User.findById(id)

            if (!userExists) {
                return res.status(404).json({ error: 'User not found.' });
            }

            res.status(200).json({ id: userExists.id, name: userExists.name, email: userExists.email, capacity: userExists.capacity }); // Return only name and email
        } catch (error) {
            console.error("Error in getUser:", error);
            res.status(500).json({ error: 'An error occurred while fetching the user.' });
        }
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
    // GET thông tin người dùng theo name
    async findUserByUsername(req, res) {
        // console.log(username);
        try {
            const username = req.query.search;
            const user = await User.findByUsername(username);

            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            return res.status(200).json({ name: user.name, email: user.email });
        } catch (error) {
            console.error("Error in getUserById:", error);
            res.status(500).json({ error: 'An error occurred while fetching the user.' });
        }
    }


    // PUT để cập nhật thông tin người dùng
    async updateUserPassword(req, res) {
        try {
            // const userId = req.params.id;
            // const { id, name, email } = req.user;
            const { id } = req.user;
            // const { currentPassword, newPassword, name, email, roleId } = req.body;
            const { currentPassword, newPassword } = req.body;

            // Tìm người dùng trong cơ sở dữ liệu
            const userExists = await User.findById(id);
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
                // name: name || userExists.name, // Giữ giá trị cũ nếu không có giá trị mới
                email: userExists.email,
                password: hashedPassword,
                // roleId: roleId || userExists.roleId,
            };

            // Cập nhật thông tin người dùng
            const updated = await User.update(id, updatedData);
            if (updated) {
                return res.status(200).json({ message: 'Password updated successfully.' });
            }

            return res.status(500).json({ error: 'Failed to update user.' });
        } catch (error) {
            console.error("Error in updateUser:", error);
            res.status(500).json({ error: 'An error occurred while updating the user.' });
        }
    }

    async updateUserEmail(req, res) {
        try {
            const { id, name, email } = req.user;

            const { newEmail } = req.body;

            // Tìm người dùng trong cơ sở dữ liệu
            const userExists = await User.findById(id);
            if (!userExists) {
                return res.status(404).json({ error: 'User not found.' });
            }

            const userPassword = userExists.password; // Giữ mật khẩu cũ nếu không có mật khẩu mới

            // Chuẩn bị dữ liệu cập nhật
            const updatedData = {
                email: newEmail,
                password: userPassword,
                // roleId: roleId || userExists.roleId,
            };

            // Cập nhật thông tin người dùng
            const updated = await User.update(id, updatedData);
            if (updated) {
                return res.status(200).json({ message: 'Email updated successfully.' });
            }

            return res.status(500).json({ error: 'Failed to update user.' });
        } catch (error) {
            console.error("Error in updateUser:", error);
            res.status(500).json({ error: 'An error occurred while updating the user.' });
        }
    }

    // DELETE để xóa người dùng
    async deleteUser(req, res) {
        const userId = req.params.id;
        res.send(`DELETE request for user with ID: ${userId}`);
    }
    async ChangeRoleId(req, res) {
        try {
            const { id, name, email } = req.user;
            const userExists = await User.findById(id); // Check userExists
            if (!userExists) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Nếu người dùng là admin, có quyền thay đổi vai trò
            if (userExists.roleId === 1) {
                // chổ ni đợi tiến truyền api vào 
                const { newRoleId, userId } = req.body; // Giả sử bạn gửi newRoleId và userId trong body của request
                // Kiểm tra tính hợp lệ của newRoleId và userId
                if (!userId || !newRoleId || ![1, 2].includes(newRoleId)) {
                    return res.status(400).json({ message: 'Invalid userId or newRoleId' });
                }
                // Cập nhật RoleId của người dùng
                const result = await User.updateRoleId(newRoleId, userId);
                // Kiểm tra nếu cập nhật thành công
                if (result) {
                    return res.status(200).json({ message: 'Role updated successfully' });
                } else {
                    return res.status(404).json({ message: 'User not found or RoleId is the same' });
                }
            } else {
                return res.status(403).json({ message: 'You do not have permission to change roles' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while changing role', error: error.message });
        }
    }

    async UpdateUserCapacity(req, res) {
        try {
            const { id, name, email } = req.user;
            const userExists = await User.findById(id);
            if (!userExists) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (userExists.roleId === 1) {
                const { newCapacity, userId, capacityPackageId } = req.body;
                if (!userId || !newCapacity) {
                    return res.status(400).json({ message: 'Invalid userId or newRoleId' });
                }
                const result = await User.updateCapacity(newCapacity, userId);
                await HistoryUpgrade.updateStatusByUserId(userId);
                if (result) {
                    return res.status(200).json({ message: 'Role updated successfully' });
                } else {
                    return res.status(404).json({ message: 'User not found or RoleId is the same' });
                }
            } else {
                return res.status(403).json({ message: 'You do not have permission to change roles' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while changing role', error: error.message });
        }
    }
}

export default new UserController();
