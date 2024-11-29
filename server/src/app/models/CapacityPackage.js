import db from '../../config/database.js';

const CapacityPackage = {
    getAllCapacityPackages: async () => {
        try {
            const query = 'SELECT * FROM capacity_package';
            const [rows] = await db.query(query);
            return rows;
        } catch (error) {
            console.error('Error fetching capacity packages:', error);
            throw error; // Re-throw the error so it can be handled further up if needed
        }
    },
    createCapacityPackage: async (data) => {
        const { name, size, description, price } = data;

        try {
            const query = `
                INSERT INTO capacity_package (name, size, description, price)
                VALUES (?, ?, ?, ?)
            `;
            const [result] = await db.query(query, [name, size, description, price]);

            if (result.affectedRows > 0) {
                console.log("Capacity package inserted successfully.");
            } else {
                console.error("Failed to insert capacity package.");
            }

            return result.insertId;
        } catch (error) {
            console.error("Error inserting capacity package:", error);
            throw new Error("Failed to create capacity package. Please try again.");
        }
    },
    updateCapacityPackage: async (id, data) => {
        try {
            const { name, size, description, price } = data;
            const query = 'UPDATE capacity_package SET name = ?, size = ?, description = ?, price = ? WHERE id = ?';
            const [result] = await db.query(query, [name, size, description, price, id]);

            if (result.affectedRows > 0) {
                console.log(`Capacity package with ID ${id} updated successfully.`);
            } else {
                console.error(`No capacity package found with ID ${id} to update.`);
            }

            return result.affectedRows;
        } catch (error) {
            console.error('Error updating capacity package:', error);
            throw new Error('Failed to update capacity package. Please try again.');
        }
    },

    deleteCapacityPackage: async (id) => {
        try {
            const query = 'DELETE FROM capacity_package WHERE id = ?';
            const [result] = await db.query(query, [id]);
            return result.affectedRows; // Trả về số dòng bị ảnh hưởng (số bản ghi đã xóa)
        } catch (error) {
            console.error("Error deleting capacity package:", error);
            throw new Error("Failed to delete capacity package. Please try again.");
        }
    }
}

export default CapacityPackage;
