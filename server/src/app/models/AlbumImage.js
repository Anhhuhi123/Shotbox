import db from '../../config/database.js'

const AlbumImages = {
    getAllImagesFromAlbum: async (urlParams) => {
        try {
            const query = `
                SELECT 
                    album_images.id,  
                    images.id AS imageId, 
                    images.url, 
                    album.albumName,
                    album.description,
                    album.createdAt
                FROM album
                JOIN album_images ON album.id = album_images.albumId
                JOIN images ON album_images.imageId = images.id
                WHERE album.location = ?;
            `;

            const [rows] = await db.query(query, [urlParams]);
            return rows;
        } catch (error) {
            console.error("Error retrieving images from album:", error);
            throw new Error("Unable to retrieve images. Please try again later.");
        }
    },
    create: async (albumId, imageId) => {
        try {
            const query = 'INSERT INTO album_images (albumId, imageId) VALUES (?, ?)';
            const [result] = await db.query(query, [albumId, imageId]);
            return result.insertId;
        } catch (error) {
            console.error(`Error inserting album`, error);
            throw new Error('Unable to insert album into the database.');
        }
    },
    delete: async (albumImgId) => {
        try {
            const query = 'DELETE FROM album_images WHERE id = ?';
            const [result] = await db.query(query, [albumImgId]);
            return result.affectedRows;
        } catch (error) {
            console.error("Error deleting image:", error);
            throw new Error("Failed to delete image. Please try again.");
        }
    },
    deleteByImgId: async (imageId) => {
        try {
            const query = 'DELETE FROM album_images WHERE imageId = ?';
            const [result] = await db.query(query, [imageId]);
            return result.affectedRows;
        } catch (error) {
            console.error("Error deleting image:", error);
            throw new Error("Failed to delete image. Please try again.");
        }
    }
    // delete: async (albumImgId) => {
    //     try {
    //         const query = 'DELETE FROM album_images WHERE id = ?';
    //         const [result] = await db.query(query, [albumImgId]);
    //         return result.affectedRows;
    //     } catch (error) {
    //         console.error("Error deleting image:", error);
    //         throw new Error("Failed to delete image. Please try again.");
    //     }
    // }


}

export default AlbumImages;
