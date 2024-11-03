import User from '../models/User.js';
import bcrypt from "bcrypt";

const saltRounds = 10;

class RegisterController {

    // POST localhost/register
    async createUser(req, res) {
        try {
            const { username, password, ...otherFields } = req.body;

            const userExists = await User.findByUsername(username);
            if (userExists) {
                return res.status(401).json({ error: 'User already exists.' });
            }

            const hashPassword = await bcrypt.hash(password, saltRounds);
            const newData = {
                username,
                password: hashPassword,
                ...otherFields
            };

            await User.create(newData);
            return res.status(200).json({ data: 'Register success' });
        } catch (error) {
            console.error('Error during registration:', error); // Log lỗi chi tiết
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new RegisterController();
