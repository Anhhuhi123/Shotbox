import HistoryUpgrade from '../models/HistoryUpgrade.js';
import User from '../models/User.js';
class HistoryUpgradeController {
    async showAllHistoryUpgrades(req, res) {
        try {
            const { id, name, email } = req.user;
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
            const { id, name, email } = req.user;
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
    async postHistoryUpgrade(req, res) {
        try {
            const data = req.body;
            const { id, name, email } = req.user;
            await HistoryUpgrade.create(data, id);
            res.status(201).json({
                message: 'Request successfully.',
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