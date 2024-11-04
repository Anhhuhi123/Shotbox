import db from '../../config/database.js';

const DeletedImages = {
    // Hàm thêm ảnh vào bảng deleted_images
    create: async (data) => {
        console.log('Data to delete:', data);
        const { id, userId, fileName, fileSize, fileWidth, fileHeight, fileFormat, url } = data;

        try {
            const query = `
                INSERT INTO Deleted_Images ( url, fileName, fileSize, fileWidth, fileHeight, fileFormat, deletedBy)
                VALUES ( ?, ?, ?, ?, ?, ?, ?)
            `;
            const [result] = await db.query(query, [url, fileName, fileSize, fileWidth, fileHeight, fileFormat, userId]);

            // Kiểm tra ảnh đã được thêm thành công
            if (result.affectedRows > 0) {
                console.log("Deleted image inserted successfully.");
            } else {
                console.error("Failed to insert deleted image.");
            }

            // const queryy = 'SELECT * FROM Deleted_Images';
            // const [ketqua] = await db.query(queryy);
            // console.log(ketqua); // Hiển thị tất cả ảnh hiện có trong bảng

            return result.insertId;
        } catch (error) {
            console.error("Error inserting deleted image:", error);
        }
    }
}

export default DeletedImages;
