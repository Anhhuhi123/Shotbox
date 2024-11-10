import DeletedImages from '../models/DeletedImages.js';
import Images from '../models/Images.js';
class DeletedImagesController {
    // Get localhost/album/
    async showAllDeletedImages(req, res) {
        try {
            const { id, name, email } = req.user; // data handle from middleware
            const deletedImages = await DeletedImages.getAllDeletedImages(id);;
            return res.status(200).json({ data: deletedImages });
        } catch (error) {
            console.error("Error fetching images:", error); // Log lỗi chi tiết
            return res.status(500).json({ error: "An error occurred while fetching images." });
        }
    }
    async restoreDeletedImages(req, res) {
        const id = req.params.id;
        try {
            // step1: get and check exist deletedImage 
            const dataDeletedImage = await DeletedImages.getDeletedImageById(id);
            if (!dataDeletedImage) {
                return res.status(404).json({ message: "Image not found in deleted images." });
            }
            // get information deletedImage
            const { url, deletedBy } = dataDeletedImage;
            //step2: restore by add image into table Images
            await Images.create(url, deletedBy);
            //step3: delete deletedImage
            await DeletedImages.deleteById(id);

            return res.status(200).json({ message: "Image restored successfully." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to restore image." });
        }
    }
    async removeDeletedImages(req, res) {
        const id = req.params.id;
        try {
            const affectedRows = await DeletedImages.deleteById(id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Deleted image not found." });
            }

            return res.status(200).json({ message: "Removed deleted image successfully." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to remove deleted image." });
        }
    }


}

export default new DeletedImagesController();