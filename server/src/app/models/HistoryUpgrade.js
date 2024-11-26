import db from '../../config/database.js'
const HistoryUpgrade = {
    getAllHistoryUpgrade: async () => {
        try {
            const query = `
                SELECT
                    users.id, 
                    users.name AS userName,
                    capacity_package.name AS packageName,
                    capacity_package.size,
                    capacity_package.price,
                    history_upgrade.createdAt,
                    history_upgrade.status
                FROM users
                JOIN history_upgrade ON users.id = history_upgrade.userId
                JOIN capacity_package ON history_upgrade.capacityPackageId = capacity_package.id
            `;
            const [rows] = await db.query(query);
            return rows;
        } catch (error) {
            console.error("Error retrieving images from album:", error);
            throw new Error("Unable to retrieve images. Please try again later.");
        }
    },
    getHistoryUpgradePading: async () => {
        const status = 'pending';
        try {
            const query = `
                SELECT
                    users.id, 
                    users.name AS userName,
                    capacity_package.name AS packageName,
                    capacity_package.size,
                    capacity_package.price,
                    history_upgrade.createdAt,
                    history_upgrade.status
                FROM users
                JOIN history_upgrade ON users.id = history_upgrade.userId
                JOIN capacity_package ON history_upgrade.capacityPackageId = capacity_package.id
                WHERE history_upgrade.status = ?
            `;
            const [rows] = await db.query(query, [status]);
            return rows;
        } catch (error) {
            console.error("Error retrieving images from album:", error);
            throw new Error("Unable to retrieve images. Please try again later.");
        }
    },
    getByUserIdAndStatus: async (userId, status) => {
        try {
            const query = `
                SELECT
                    users.id, 
                    users.name AS userName,
                    capacity_package.name AS packageName,
                    capacity_package.size,
                    capacity_package.price,
                    history_upgrade.createdAt,
                    history_upgrade.status
                FROM users
                JOIN history_upgrade ON users.id = history_upgrade.userId
                JOIN capacity_package ON history_upgrade.capacityPackageId = capacity_package.id
                WHERE history_upgrade.status = ? AND history_upgrade.userId = ?
            `;
            const [rows] = await db.query(query, [status, userId]);
            return rows;
        } catch (error) {
            console.error("Error retrieving images from album:", error);
            throw new Error("Unable to retrieve images. Please try again later.");
        }
    },
    checkPendingByUserId: async (userId) => {
        const status = 'pending';
        try {
            const query = 'SELECT * FROM history_upgrade WHERE userId = ? AND status = ?'; // Sửa 'WHEN' thành 'WHERE'
            const [rows] = await db.query(query, [userId, status]);
            return rows;
        } catch (error) {
            console.error(
                `Error querying the history_upgrade table with userId: ${userId}, status: ${status}`,
                error
            );
            throw new Error('Unable to fetch data from the database. Please try again later.');
        }
    },
    create: async (data, userId) => {
        const { capacityPackageId } = data;
        const status = 'pending';
        try {
            const query = 'INSERT INTO history_upgrade (userId, capacityPackageId, status) VALUES (?, ?, ?)';
            const [result] = await db.query(query, [userId, capacityPackageId, status]);
            return result.insertId;
        } catch (error) {
            console.error(
                `Error inserting into history_upgrade table with data: ${JSON.stringify(data)}, userId: ${userId}`,
                error
            );
            throw new Error('Unable to insert data into the database. Please try again later.');
        }
    },
    updateStatusByUserId: async (userId) => {
        const statusSuccess = 'success';
        const statusPending = 'pending';
        try {
            const query = 'UPDATE history_upgrade SET status = ? WHERE userId = ? AND status = ? ';
            const [result] = await db.query(query, [statusSuccess, userId, statusPending]);
            return result.affectedRows;
        } catch (error) {
            console.error('Error updating album:', error);
            throw new Error('Failed to update album');
        }
    },
    // isAlbumNameExists: async (albumName, userId) => {
    //     try {
    //         const query = 'SELECT COUNT(*) AS count FROM album WHERE albumName = ? AND userId = ?';
    //         const [rows] = await db.query(query, [albumName, userId]);
    //         return rows[0].count > 0; // Trả về true nếu có ít nhất 1 album trùng tên
    //     } catch (error) {
    //         console.error("Error checking album name:", error);
    //         throw new Error("Unable to check album name.");
    //     }
    // },
    // delete: async (id) => {
    //     try {
    //         const query = 'DELETE FROM album WHERE id = ?';
    //         const [result] = await db.query(query, [id]);
    //         return result.affectedRows;
    //     } catch (error) {
    //         console.error("Error deleting image:", error);
    //         throw new Error("Failed to delete image. Please try again.");
    //     }
    // },
    // checkDuplicateAlbumName: async (albumName, id) => {
    //     try {
    //         const query = `
    //             SELECT COUNT(*) as count 
    //             FROM album 
    //             WHERE albumName = ? AND id != ?
    //         `;
    //         const [rows] = await db.query(query, [albumName, id]);
    //         return rows[0].count > 0; // Nếu số lượng lớn hơn 0, nghĩa là đã tồn tại album
    //     } catch (error) {
    //         console.error("Error checking duplicate album name:", error);
    //         throw new Error("Failed to check duplicate album name.");
    //     }
    // },

}

export default HistoryUpgrade;



// const query = `
// SELECT 
//     album_images.id,  
//     images.id AS imageId, 
//     images.url, 
//     album.albumName,
//     album.description,
//     album.createdAt
// FROM users
// JOIN history_upgrade ON users.id = history_upgrade.capacityPackageId
// JOIN capacity_package ON history_upgrade.capacityPackageId = capacity_package.id
// WHERE album.location = ?;
// `;



// history_upgrade.id,  
// users.id AS userId, 
// users.name AS userName,
// users.email,
// users.capacity,
// capacity_package.name,
// capacity_package.size,
// capacity_package.price,
// history_upgrade.createdAt