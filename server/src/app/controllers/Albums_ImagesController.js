import Albums_Images from '../models/Albums_Images.js';

class Albums_ImagesController {
    // Get localhost/images/
    async getAllImageswithId_album(req, res) {
        const ImageswithId_album = await Albums_Images.getAllImageswithId_album();
        console.log(ImageswithId_album)
        return res.status(201).json({ data: ImageswithId_album });
    }
    async addImagesToAlbum(req, res) {
        await Albums_Images.addImagesToAlbum(req.body);
        return res.status(201).json({ data: 'Success' });
    }
    // async findByIdAlbum(req, res) {
    //     const albumId = req.params.id; // Lấy album ID từ tham số URL
        
    //     try {
    //         const album = await Albums_Images.findByIdAlbum(albumId); // Gọi phương thức tìm kiếm từ model
            
    //         if (album) {
    //             return res.status(200).json({
    //                 message: 'Album tìm thấy',
    //                 data: album
    //             });
    //         } else {
    //             return res.status(404).json({
    //                 message: 'Album không tìm thấy'
    //             });
    //         }
    //     } catch (error) {
    //         console.error("Lỗi khi tìm album:", error);
    //         return res.status(500).json({
    //             message: 'Lỗi khi tìm album',
    //             error: error.message
    //         });
    //     }
    // }
    

}

export default new Albums_ImagesController();