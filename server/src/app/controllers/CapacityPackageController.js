import CapacityPackage from '../models/CapacityPackage.js';
import User from '../models/User.js';

class CapacityPackageController {
    async showAllCapacityPackages(req, res) {
        try {
            const capacityPackages = await CapacityPackage.getAllCapacityPackages();
            return res.status(200).json({ data: capacityPackages });
        } catch (error) {
            console.error("Error fetching capacity packages:", error); // Log lỗi chi tiết
            return res.status(500).json({ error: "An error occurred while fetching capacity packages." });
        }
    }
    async postCapacityPackage(req, res) {
        try {
            const { id, name, email } = req.user;
            const userExists = await User.findById(id);
            if (!userExists) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (userExists.roleId === 1) {
                const data = req.body;
                const result = await CapacityPackage.createCapacityPackage(data);

                if (result) {
                    return res.status(201).json({ message: 'Capacity package created successfully' });
                } else {
                    return res.status(400).json({ message: 'Failed to create capacity package' });
                }
            } else {
                return res.status(403).json({ message: 'You do not have permission to create capacity packages' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while creating the capacity package', error: error.message });
        }
    }
    async updateCapacityPackage(req, res) {
        try {
            const { id, name, email } = req.user;
            const userExists = await User.findById(id);
            if (!userExists) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (userExists.roleId === 1) {
                const idPackage = req.params.id;
                const data = req.body;
                const result = await CapacityPackage.updateCapacityPackage(idPackage, data);

                if (result > 0) {
                    return res.status(200).json({ message: 'Capacity package updated successfully' });
                } else {
                    return res.status(400).json({ message: 'Failed to update capacity package' });
                }
            } else {
                return res.status(403).json({ message: 'You do not have permission to update capacity packages' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while updating the capacity package', error: error.message });
        }
    }
    async deleteCapacityPackage(req, res) {
        try {
            const { id, name, email } = req.user;
            const userExists = await User.findById(id);

            if (!userExists) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (userExists.roleId === 1) {
                const idPackage = req.params.id;
                const result = await CapacityPackage.deleteCapacityPackage(idPackage);

                if (result > 0) {
                    return res.status(200).json({ message: 'Capacity package deleted successfully' });
                } else {
                    return res.status(400).json({ message: 'Failed to delete capacity package' });
                }
            } else {
                return res.status(403).json({ message: 'You do not have permission to delete capacity packages' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while deleting the capacity package', error: error.message });
        }
    }
}

export default new CapacityPackageController();