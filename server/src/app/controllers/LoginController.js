import AuthenService from '../services/AuthenService.js';

class LoginController {
    async login(req, res) {
        try {
            const { username, password } = req.body;
<<<<<<< HEAD
            const user = await User.findByUsername(username);
            if (!user) {
                // res error if cannot find user 
                return res.status(400).json({ field: 'username', error: 'Username is not correct' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                // res error if password is not correct 
                return res.status(400).json({ field: 'password', error: 'Password is not correct' });
            }
            // res data if success
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.name,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRE,
                    //expiresIn: '3s'
                }
            )

=======
            const result = await AuthenService.login(username, password);
>>>>>>> tien
            return res.status(200).json({
                message: result.message,
                token: result.token,
                user: result.user
            })
        } catch (error) {
            console.error(error);
            if (error.statusCode) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new LoginController();
