import Images from '../models/Images.js';

class ImagesController {
    // Get localhost/images/
    async getAllImages(req, res) {
        const images = await Images.getAllImages();
        console.log(images)
        return res.status(200).json({ data: images });
    }
    // Post localhost/images/
    async postImages(req, res) {
        await Images.create(req.body);
        return res.status(200).json({ data: 'Success' });
    }
    // Delete
    async deleteImages(req, res) {
        const imageId = req.params.id;
        res.send(`Delete ${imageId}`);
    }

}

export default new ImagesController();