import Images from '../models/Images.js';
import AlbumImage from '../models/AlbumImage.js';

class ImagesController {
    // Get localhost/images/
    async getAllImages(req, res) {
        try {
            const { id, name, email } = req.user; // data handle from middleware
            const images = await Images.getAllImages(id);
            console.log(images);
            return res.status(200).json({ data: images });
        } catch (error) {
            console.error("Error fetching images:", error); // Log lỗi chi tiết
            return res.status(500).json({ error: "An error occurred while fetching images." });
        }
    }
    // Post localhost/images/
    async postImages(req, res) {
        try {
            const { url } = req.body;
            const { id, name, email } = req.user;

            // check input
            if (!url) {
                return res.status(400).json({ error: 'Image URL is required.' });
            }

            await Images.create(url, id);
            return res.status(201).json({ data: 'Image uploaded successfully' });
        } catch (error) {
            console.error('Error uploading image:', error); // Log detail error
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Delete localhost/images/:id
    async deleteImages(req, res) {
        try {
            const imgId = req.params.id;
            // step1: delete images from album before delete original images
            const deleteImageFromAlbum = await AlbumImage.deleteByImgId(imgId);
            // step2: delete original images
            const affectedRows = await Images.delete(imgId);

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

}

export default new ImagesController();