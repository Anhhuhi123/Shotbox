import db from '../../config/database.js'
const Image = {
    getAllImages: async () => {
        const query = 'SELECT * FROM images';
        const [rows] = await db.query(query);
        return rows;
    },
    create: async (data) => {
        const { userID, fileName, fileSize, fileWidth, fileHeight, fileFormat,filePath} = data;
        const query = 'INSERT INTO images (userID, fileName, fileSize, fileWidth, fileHeight, fileFormat,filePath) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(
            query, [userID, fileName, fileSize, fileWidth, fileHeight, fileFormat,filePath]
        );
        return result.insertId;
    },
    delete: async (data) => {
        const { Id } = data; // Lấy album_id từ data
        const query = 'DELETE FROM image WHERE id = ?';
    
        try {
            const [result] = await db.query(query, [Id]);
            return result.affectedRows; // Trả về số lượng bản ghi đã bị xóa (nếu thành công là 1)
        } catch (error) {
            console.error("Lỗi khi xóa image:", error);
            throw error;
        }
    }
}

export default Image;