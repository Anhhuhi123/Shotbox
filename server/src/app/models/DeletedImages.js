import db from '../../config/database.js';

const DeletedImages = {
    getAllDeletedImages: async (idUser) => {
        try {
            const query = 'SELECT * FROM deleted_images WHERE deletedBy = ?';
            const [rows] = await db.query(query, [idUser]);
            return rows;
        } catch (error) {
            console.error('Error fetching deleted images:', error);
            throw error; // Re-throw the error so it can be handled further up if needed
        }
    },
    getDeletedImageById: async (id) => {
        try {
            const query = 'SELECT * FROM deleted_images WHERE id = ?';
            const [rows] = await db.query(query, [id]);
            return rows[0];
        } catch (error) {
            console.error('Error fetching deleted images:', error);
            throw error; // Re-throw the error so it can be handled further up if needed
        }
    },

    // Hàm thêm ảnh vào bảng deleted_images
    create: async (data) => {
        // console.log('Data to delete:', data);
        const { id, userId, fileName, fileSize, fileWidth, fileHeight, fileFormat, url } = data;

        try {
            const query = `
                INSERT INTO Deleted_Images ( url, fileName, fileSize, fileWidth, fileHeight, fileFormat, deletedBy)
                VALUES ( ?, ?, ?, ?, ?, ?, ?)
            `;
            const [result] = await db.query(query, [url, fileName, fileSize, fileWidth, fileHeight, fileFormat, userId]);

            return result.insertId;
        } catch (error) {
            console.error("Error inserting deleted image:", error);
        }
    },
    deleteById: async (id) => {
        try {
            const query = 'DELETE FROM deleted_images WHERE id = ?';
            const [result] = await db.query(query, [id]);
            return result.affectedRows;
        } catch (error) {
            console.error("Error deleting image:", error);
            throw new Error("Failed to delete image. Please try again.");
        }
    }
}

export default DeletedImages;
