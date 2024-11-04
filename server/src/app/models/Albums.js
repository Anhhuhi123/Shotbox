import db from '../../config/database.js'
const Album = {
    getAllAblums: async () => {
        const query = 'SELECT * FROM album';
        const [rows] = await db.query(query);
        return rows;
    },
    create: async (data) => {
        
        const {userId,albumName,description }= data;
        const query = 'INSERT INTO album (userId, albumName,description) VALUES (?, ?,?)';
        const [result] = await db.query(
            query, [userId,albumName,description]
        );
        return result.insertId;
    },
    update : async (data) => {
        const {id,albumName, description } = data;
    
        // Khởi tạo câu truy vấn động và mảng các tham số
        let query = 'UPDATE album SET ';
        const fields = [];
        const values = [];
    
        // Chỉ thêm các trường có giá trị mới vào câu truy vấn và mảng tham số
        if (albumName !== undefined) {
            fields.push('albumName = ?');
            values.push(albumName);
        }
        
        if (description  !== undefined) {
            fields.push('description = ?');
            values.push(description);
        }
    
        // Kết hợp các trường vào câu truy vấn
        query += fields.join(', ') + ' WHERE id = ?';
        values.push(id); // Thêm ID vào cuối mảng để so khớp trong điều kiện WHERE
    
        // Thực thi truy vấn với các tham số được xác định
        const [result] = await db.query(query, values);
        return result.affectedRows > 0 ? { id, albumName, description } : null;  
    },
    delete: async (data) => {
        const { id } = data; // Lấy album_id từ data
        const deleteAlbumImagesQuery = 'DELETE FROM album_images WHERE albumId = ?';// chỗ này mai cần sửa lại cơ sỡ dữ liệu
        const query = 'DELETE FROM album WHERE id = ?';
    
        try {
            await db.query(deleteAlbumImagesQuery, [id]);//chỗ này mai cần sửa lại cơ sỡ dữ liệu
            const [result] = await db.query(query, [id]);
            return result.affectedRows; // Trả về số lượng bản ghi đã bị xóa (nếu thành công là 1)
        } catch (error) {
            console.error("Lỗi khi xóa album:", error);
            throw error;
        }
    }
    
}

export default Album;