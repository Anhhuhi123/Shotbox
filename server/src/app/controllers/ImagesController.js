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
    async deleteImages(req, res) 
    {
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
        }
    }
}

export default new ImagesController();