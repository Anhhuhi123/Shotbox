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

}

export default new AlbumImageController();