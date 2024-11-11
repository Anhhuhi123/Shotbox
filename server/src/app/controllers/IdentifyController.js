import sgMail from '@sendgrid/mail';
import Identify from '../models/Identify.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const generateResetId = () => Math.floor(100000 + Math.random() * 900000).toString();
class IdentifyController {
    // Get localhost/identify/:id
    async findIdentify(req, res) {
        try {
            const { id } = req.params;
            const identify = await Identify.getIdentify(id);
            if (!identify) {
                return res.status(404).json({ error: 'ID code not found' });
            }

            return res.status(200).json({ message: 'ID code is exist' });
        } catch (error) {
            console.error("Error fetching identify data:", error);

            return res.status(500).json({ error: "An error occurred while fetching identify data." });
        }
    }

    // Post localhost/identify/
    async postIdentify(req, res) {
        try {
            const { email } = req.body;
            const idCode = generateResetId();

            // Thêm email và idCode vào cơ sở dữ liệu
            await Identify.create(email, idCode);

            const msg = {
                to: email,
                from: 'nguyenquocanh28032004@gmail.com', // Địa chỉ email gửi đi
                subject: 'Mã xác nhận đặt lại mật khẩu',
                text: `Mã xác nhận của bạn là: ${idCode}`,
            };

            // Gửi email
            await sgMail.send(msg);

            // Hủy mã sau 30s
            setTimeout(async () => {
                try {
                    await Identify.deleteById(idCode);
                    // console.log(`ID ${idCode} đã được xóa sau 30s.`);
                } catch (error) {
                    console.error(`Lỗi khi xóa idCode ${idCode}:`, error);
                }
            }, 30000);

            return res.status(201).json({ message: 'idCode is sent' });

        } catch (error) {
            console.error('Lỗi khi xử lý yêu cầu gửi email:', error);
            return res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi mã xác nhận. Vui lòng thử lại.' });
        }
    }
    // Put localhost/identify/
    async confirmNewPassword(req, res) {
        try {
            const { username, email, newPassword } = req.body;

            const user = await User.findByUsername(username);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const userId = user.id;

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            const data = {
                email: email,
                password: hashedPassword,
            };
            // update reset password
            const updatePassword = await User.update(userId, data);

            if (!updatePassword) {
                return res.status(500).json({ error: 'Failed to update user data' });
            }

            return res.status(200).json({ message: 'Password updated successfully' });

        } catch (error) {
            console.error("Error updating user data:", error);
            return res.status(500).json({ error: "An error occurred while updating user data." });
        }
    }

}

export default new IdentifyController();