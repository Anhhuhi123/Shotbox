import Images from '../models/Images.js';

class ImagesController {
    // Get localhost/images/
    async getAllImages(req, res) {
        const images = await Images.getAllImages();
        // console.log(images)
        return res.status(200).json({ data: images });
    }
    // Post localhost/images/
    async postImages(req, res) {
        await Images.create(req.body);
        return res.status(200).json({ data: 'Success' });
    }
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

}

export default new ImagesController();