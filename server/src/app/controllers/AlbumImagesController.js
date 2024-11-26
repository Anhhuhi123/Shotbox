import AlbumImage from '../models/AlbumImage.js';

class AlbumImageController {
    // Get localhost/album/images/
    async postImageToAlbum(req, res) {
        try {
            const { albumId, imageId } = req.body;
            await AlbumImage.create(albumId, imageId);
            return res.status(201).json({ message: 'Push image into ablum successfully' });
        } catch (error) {
            console.error('Error uploading image:', error); // Log lỗi chi tiết
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async postMultipleImageToAlbum(req, res) {
        try {
            const { albumId, listImageId } = req.body;
            // Validate input data
            if (!albumId || !Array.isArray(listImageId) || listImageId.length === 0) {
                return res.status(400).json({ message: 'Invalid input data. Please provide a valid albumId and a list of image IDs.' });
            }
            // Process each image ID one by one
            for (const imageId of listImageId) {
                await AlbumImage.create(albumId, imageId);
            }
            return res.status(201).json({ message: 'Images added to the album successfully.' });
        } catch (error) {
            console.error('Error adding images to album:', error); // Log detailed error
            return res.status(500).json({ message: 'An error occurred while processing your request. Please try again later.' });
        }
    }

    async showImagesFromAlbum(req, res) {
        try {
            // const urlParams = req.params.id;
            const urlParams = req.params.slug;

            const images = await AlbumImage.getAllImagesFromAlbum(urlParams);

            return res.status(200).json({ data: images });
        } catch (error) {
            console.error("Error fetching images:", error); // Log lỗi chi tiết
            return res.status(500).json({ error: "An error occurred while fetching images." });
        }
    }
    async deleteImageFromAlbum(req, res) {
        try {
            const albumImgId = req.params.id;
            const affectedRows = await AlbumImage.delete(albumImgId);

            if (affectedRows > 0) {
                res.status(200).json({ message: "Image deleted successfully." });
            } else {
                res.status(404).json({ message: "Image not found." });
            }
        } catch (error) {
            console.error("Error deleting image:", error);
            res.status(500).json({ message: "Failed to delete image. Please try again later." });
        }
    }

    async deleteMultipleImageFromAlbum(req, res) {
        try {
            const listAlbumImgId = req.body;
            let deletedCount = 0;
            for (const albumImgId of listAlbumImgId) {
                let affectedRows = await AlbumImage.delete(albumImgId);
                // Nếu ảnh bị xóa thành công, tăng đếm
                if (affectedRows > 0) {
                    deletedCount++;
                }
            }
            if (deletedCount > 0) {
                res.status(200).json({ message: `${deletedCount} image(s) deleted successfully.` });
            } else {
                res.status(404).json({ message: "No images found to delete." });
            }
        } catch (error) {
            console.error("Error deleting images:", error);
            res.status(500).json({ message: "Failed to delete image(s). Please try again later." });
        }
    }


}

export default new AlbumImageController();