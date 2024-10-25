import User from '../models/User.js';
import bcrypt from "bcrypt";
const saltRounds = 10;
class RegisterController {

    // POST localhost/register
    async createUser(req, res) {
        try {
            let data = req.body;
            const userExists = await User.findByUsername(data.username);
            if (userExists) {
                return res.status(401).json({ error: 'User already exists.' });
            }
            // const emailExists = await User.findByEmail(data.email);
            // if (emailExists) {
            //     return res.status(401).json({ error: 'Email already exists.' });
            // }
            const hashPassword = await bcrypt.hash(data.password, saltRounds);
            let newData = {
                ...data,
                password: hashPassword
            }
            await User.create(newData);
            return res.status(200).json({ data: 'Register success' });
        } catch (error) {
            console.error('Error during registration:', error); // Log lỗi chi tiết
            return res.status(500).json({ error: error.message });
        }

        // console.log(req.body)
        // const { name, age } = req.body;
        // return res.status(200).json({ name, age })

        // const { name, age, password } = req.body;
        // const saltRounds = 5;
        // const hashPassword = bcrypt.hashSync(password, saltRounds);
        // console.log(bcrypt.compareSync(password, hashPassword));
        // return res.status(200).json({ name, age, hashPassword })

        // let data = req.body;
        // let newData = {
        //     ...data,
        //     password: '1', // Sửa lại cú pháp ở đây
        // };
        // console.log(data)
        // console.log(newData)


    }
}

export default new RegisterController();