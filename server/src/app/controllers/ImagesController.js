import ImageService from '../services/ImageService.js';
class ImagesController {
<<<<<<< HEAD
    // Get localhost/images/
    async getAllImages(req, res) {
        const images = await Images.getAllImages();
        console.log(images)
        return res.status(200).json({ data: images });
=======
    async showAllImage(req, res) {
        try {
            const { id } = req.user;
            const images = await ImageService.getAllImages(id);
            return res.status(200).json({ data: images });
        } catch (error) {
            console.error("Error fetching images:", error); // Log lỗi chi tiết
            if (error.statusCode) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ error: 'Internal Server Error' });
        }
>>>>>>> tien
    }
    async postImages(req, res) {
        try {
            const { url } = req.body;
            const { id } = req.user;
            const result = await ImageService.uploadImage(url, id);
            return res.status(201).json(result);
        } catch (error) {
            console.error('Error uploading image:', error); // Log detail error
            if (error.statusCode) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
<<<<<<< HEAD
    // Delete

    async deleteImages(req, res) {
        const id = req.params.id;
        try {
            const result = await Images.delete({ id });
            if (result) {
                return res.status(200).json({ message: `Images với ID ${id} đã được xóa` });
            } else {
                return res.status(404).json({ message: 'Images không tìm thấy' });
            }
        } catch (error) {
            console.error("Lỗi khi xóa Images:", error);
            return res.status(500).json({ error: 'Lỗi khi xóa Images' });
        }
    }
    //anh_new
    async deleteImages(req, res) {
        try {
            // const { id , name , gmail } = req.user ;
            // console.log(id);

            const imageId = req.params.id;
            //const deletedBy = req.body.deletedBy;
            console.log(imageId);
            //console.log(deletedBy);
            await Images.deleteImages(imageId, 1);
            res.status(200).json({ message: 'Image deleted and moved to Deleted_Images' });
        } catch (error) {
            console.error('Error deleting image:', error);
            res.status(500).json({ message: 'Failed to delete image' });
=======
    async deleteImages(req, res) {
        try {
            const imgId = req.params.id;
            const result = await ImageService.deleteImage(imgId);
            res.status(200).json(result);

        } catch (error) {
            console.error("Error deleting image:", error);
            if (error.statusCode) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    }
    async deleteMultiple(req, res) {
        try {
            const arrIdImg = req.body;
            const result = await ImageService.deleteMultipleImages(arrIdImg);
            if (result.statusCode === 207) {
                return res.status(207).json({
                    message: result.message,
                    deletedImages: result.deletedImages,
                    notFoundIds: result.notFoundIds,
                });
            }
            return res.status(200).json({
                message: result.message,
                deletedImages: result.deletedImages,
            });

        } catch (error) {
            console.error("Error deleting images:", error);
            if (error.statusCode) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ error: 'Internal Server Error' })
>>>>>>> tien
        }
    }
}

export default new ImagesController();