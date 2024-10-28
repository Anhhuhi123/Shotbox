import db from '../../config/database.js'
import axios from 'axios';
import sharp from 'sharp';
import fs from 'fs'; 

const Image = {
    getAllImages: async () => {
        const query = 'SELECT filePath FROM Images';
        const [rows] = await db.query(query);
        return rows;
    },

    create: async (data) => {
        const { url } = data;
    
        // Tải dữ liệu ảnh từ URL
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);
    
        // Tính kích thước file bằng byte và chuyển đổi sang KB
        const fileSizeInKB = buffer.length / 1024; // Chuyển đổi kích thước từ byte sang KB
    
        // Sử dụng sharp để lấy thông tin ảnh
        const metadata = await sharp(buffer).metadata();
    
        const query = 'INSERT INTO Images (filePath, fileName, fileSize, fileWidth, fileHeight, fileFormat) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(
            query,
            [
                url,
                url.split('/').pop(),            // fileName từ URL
                fileSizeInKB.toFixed(2),         // fileSize đã chuyển đổi sang KB
                metadata.width,                   // fileWidth
                metadata.height,                  // fileHeight
                metadata.format                   // fileFormat
            ]
        );
    
        return result.insertId;
    },
     

    // sua lai bang deleted_images de luu tru day du thong tin cua anh
    // id truyen id anh deletedBy truyen id user
    deleteImages: async (id, deletedBy) => {
        const selectQuery = 'SELECT * FROM Images WHERE id = ?';
        const [imageData] = await db.query(selectQuery, [id]);
    
        if (imageData.length === 0) {
            throw new Error('Image not found'); 
        }
    
        const deleteQuery = 'DELETE FROM Images WHERE id = ?';
        await db.query(deleteQuery, [id]);
    
        const { filePath, fileName, fileSize, fileWidth, fileHeight, fileFormat } = imageData[0];
        const insertDeletedQuery = `
            INSERT INTO Deleted_Images (imageId, filePath, fileName, fileSize, fileWidth, fileHeight, fileFormat, deletedBy)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await db.query(insertDeletedQuery, [id, filePath, fileName, fileSize, fileWidth, fileHeight, fileFormat, deletedBy]);
    }
    
    
}

export default Image;