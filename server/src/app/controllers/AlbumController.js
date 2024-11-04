import Albums from '../models/Albums.js';
import Albums_Images from '../models/Albums_Images.js';

class AlbumController {
    // Get localhost/images/
    async getAllAlbums(req, res) {
        const albums = await Albums.getAllAblums();
        console.log(albums)
        return res.status(201).json({ data: albums });
    }
    // Post localhost/images/
    async postAlbums(req, res) {
        await Albums.create(req.body);
        return res.status(201).json({ data: 'Success' });
    }
    async updateAlbums(req, res)
    {
        try {
            const idAlbum = req.params.id;
            

            const { albumName, description } = req.body; // Dữ liệu cập nhật
                
            
            const updatedAlbum = await Albums.update({ id: idAlbum, albumName, description});

            if (updatedAlbum) {
                return res.status(200).json({
                    message: 'User updated successfully',
                    data: updatedAlbum
                });
            } else {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: 'Error updating albums',
                error: error.message
            });
        }
    }
    // Delete
    async deleteAlbums(req, res) {
        const id = req.params.id;
        try {
            
            const idAlbumExists = await Albums_Images.findByIdAlbum(id);
            if(idAlbumExists)
            {
                
                await Albums_Images.delete({id});
            }
            const result = await Albums.delete({ id });
           
            if (result) {
                return res.status(200).json({ message: `Album với ID ${id} đã được xóa` });
            } else {
                return res.status(404).json({ message: 'Album không tìm thấy' });
            }
        } catch (error) {
            console.error("Lỗi khi xóa album:", error);
            return res.status(500).json({ error: 'Lỗi khi xóa album' });
        }
    }
    

}

export default new AlbumController();