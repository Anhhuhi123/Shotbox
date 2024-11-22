import Images from '../models/Images.js';
import AlbumImage from '../models/AlbumImage.js';
import DeletedImages from '../models/DeletedImages.js';
class ImagesController {
    // Get localhost/images/
    async getAllImages(req, res) {
        try {
            const { id, name, email } = req.user; // data handle from middleware
            const images = await Images.getAllImages(id);
            return res.status(200).json({ data: images });
        } catch (error) {
            console.error("Error fetching images:", error); // Log lỗi chi tiết
            return res.status(500).json({ message: "An error occurred while fetching images." });
        }
    }
    // Post localhost/images/
    async postImages(req, res) {
        try {
            const { url } = req.body;
            const { id, name, email } = req.user;
            // check input
            if (!url) {
                return res.status(400).json({ message: 'Image URL is required.' });
            }
            await Images.create(url, id);
            return res.status(201).json({ message: 'Image uploaded successfully' });
        } catch (error) {
            console.error('Error uploading image:', error); // Log detail error
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Delete localhost/images/:id
    async deleteImages(req, res) {
        try {
            const imgId = req.params.id;
            // step1: check exist image
            const image = await Images.getImage(imgId);
            // console.log(image);
            if (image.length === 0) {
                res.status(404).json({ message: "Image not found." });
            }
            // step2: add image deleted throw table deleted_images
            await DeletedImages.create(image);
            //step3: delete images from album before delete original images
            await AlbumImage.deleteByImgId(imgId);
            //step4: delete original images
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