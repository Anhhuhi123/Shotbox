import Deleted_Images from '../models/Deleted_Images';

class Deleted_Images{
    async getAllImages_Deleted(req,res) {
        const images = await Deleted_Images.getAllImages_Deleted();
        console.log(images);
        return res.status(200).json({ data : images });
    }

    async restoreImages(req,res) {

        const { id , name , gmail } = req.user ;
        const imageId = req.params.id;
        const deletedBy = req.body.deletedBy;

        try {
            await Images.restoreImages(imageId, deletedBy);
            res.status(200).json({ message: 'Image deleted and moved to Deleted_Images' });
        } catch (error) {
            console.error('Error deleting image:', error);
            res.status(500).json({ message: 'Failed to delete image' });
        }
    }
}

export default new Deleted_ImagesController();