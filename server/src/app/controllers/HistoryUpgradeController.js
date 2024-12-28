import HistoryUpgrade from '../models/HistoryUpgrade.js';
import User from '../models/User.js';
class HistoryUpgradeController {
    async showAllHistoryUpgrades(req, res) {
        try {
            const { id } = req.user;
            const userExists = await User.findById(id); // Check userExists
            if (!userExists) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (userExists.roleId === 1) {
                const listHistoryUpgrade = await HistoryUpgrade.getAllHistoryUpgrade();
                return res.status(200).json({ data: listHistoryUpgrade });
            } else {
                return res.status(403).json({ message: 'You do not have permission to change roles' });
            }
        } catch (error) {
            console.error("Error fetching capacity packages:", error); // Log lỗi chi tiết
            return res.status(500).json({ message: "An error occurred while fetching capacity packages." });
        }
    }
    async showHistoryUpgradePading(req, res) {
        try {
            const { id } = req.user;
            const userExists = await User.findById(id); // Check userExists
            if (!userExists) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (userExists.roleId === 1) {
                const listHistoryUpgrade = await HistoryUpgrade.getHistoryUpgradePading();
                return res.status(200).json({ data: listHistoryUpgrade });
            } else {
                return res.status(403).json({ message: 'You do not have permission to change roles' });
            }
        } catch (error) {
            console.error("Error fetching capacity packages:", error); // Log lỗi chi tiết
            return res.status(500).json({ message: "An error occurred while fetching capacity packages." });
        }
    }
    async showUpgradePending(req, res) {
        try {
            const { id } = req.user;
            const userExists = await User.findById(id);
            if (!userExists) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (userExists.roleId === 1) {
                const userId = req.params.id;
                const listHistoryUpgrade = await HistoryUpgrade.getByUserIdAndStatus(userId, 'pending');
                return res.status(200).json({ data: listHistoryUpgrade });
            } else {
                return res.status(403).json({ message: 'You do not have permission to view pending upgrades' });
            }
        } catch (error) {
            console.error("Error fetching upgrade history:", error);
            return res.status(500).json({ message: "An error occurred while fetching upgrade history. Please try again later." });
        }
    }
    async showUpgradeSuccess(req, res) {
        try {
            const { id } = req.user;
            const userId = id;
            const listHistoryUpgrade = await HistoryUpgrade.getByUserIdAndStatus(userId, 'success');
            if (listHistoryUpgrade.length === 0) {
                return res.status(404).json({ message: 'No upgrade history found for this user.' });
            }
            return res.status(200).json({ data: listHistoryUpgrade });
        } catch (error) {
            console.error("Error fetching upgrade history:", error);  // In ra lỗi chi tiết
            return res.status(500).json({ message: "An error occurred while fetching upgrade history. Please try again later." });
        }
    }
    async postHistoryUpgrade(req, res) {
        try {
            const data = req.body;
            if (!data) {
                return res.status(400).json({ message: 'Missing request data.' });
            }
            const { id } = req.user;
            const userPending = await HistoryUpgrade.checkPendingByUserId(id);
            if (userPending.length > 0) {
                return res.status(409).json({ message: 'Waiting for admin confirmation.' });
            }
            // Tạo bản ghi mới
            await HistoryUpgrade.create(data, id);
            res.status(201).json({
                message: 'Request submitted successfully.',
            });
        } catch (error) {
            console.error('Error in postHistoryUpgrade:', error);
            res.status(500).json({
                message: 'Failed request. Please try again later.',
            });
        }
    }
}

export default new HistoryUpgradeController();