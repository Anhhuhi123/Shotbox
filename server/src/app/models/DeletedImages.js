import db from '../../config/database.js'

const DeletedImages = {
    create: async (data) => {
        console.log(data);
        const { id, userId, url, fileName, fileSize, fileWidth, fileHeight, fileFormat, uploadDate } = data;
        try {
            const query = `
                INSERT INTO deleted_images (imageId, url, fileName, fileSize, fileWidth, fileHeight, fileFormat, deletedBy)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const [result] = await db.query(query, [id, url, fileName, fileSize, fileWidth, fileHeight, fileFormat, userId]);
            console.log("Insert result:", result);
            return result.insertId;
        } catch (error) {
            console.log(error)
        }
    },

}

export default DeletedImages;