import User from '../models/User.js';

class UserController {
    // get localhost/user/
    async getAllUser(req, res) {
        const users = await User.getAllUsername();
        return res.status(200).json({
            data: users
        })
    }
    async getUser(req, res) {
        return res.status(200).json(
            req.user
        )
        // return res.status(201).send("hi")
    }
    // GET request để lấy thông tin người dùng theo ID
    getUserById(req, res) {
        const userId = req.params.id;
        // Logic để lấy thông tin người dùng dựa vào userId
        res.send(`GET request for user with ID: ${userId}`);
    }

    // PUT request để cập nhật thông tin người dùng
    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const { name, email, password, roldId } = req.body; // Dữ liệu cập nhật
                
            // Gọi hàm update từ model User để cập nhật thông tin người dùng
            const updatedUser = await User.update({ id: userId, name, email, password, roldId});

            if (updatedUser) {
                return res.status(200).json({
                    message: 'User updated successfully',
                    data: updatedUser
                });
            } else {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: 'Error updating user',
                error: error.message
            });
        }
    }

    // DELETE request để xóa người dùng
    deleteUser(req, res) {
        const userId = req.params.id;
        // Logic để xóa người dùng
        res.send(`DELETE request for user with ID: ${userId}`);
    }

}

export default new UserController();