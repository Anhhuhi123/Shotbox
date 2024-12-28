import Album from '../models/Album.js';
import AlbumImage from '../models/AlbumImage.js';

class AlbumController {
    async showAllAlbums(req, res) {
        try {
            const { id } = req.user;
            const albums = await Album.getAllAlbums(id);
            return res.status(200).json({ data: albums });
        } catch (error) {
            console.error("Error fetching images:", error); // Log lỗi chi tiết
            return res.status(500).json({ error: "An error occurred while fetching images." });
        }
    }
    async showAlbumDetail(req, res) {
        try {
            const urlParams = req.params.id;
            const albums = await Album.findAlbumByUrlParams(urlParams);
            return res.status(200).json({ data: albums });
        } catch (error) {
            console.error("Error fetching images:", error); // Log lỗi chi tiết
            return res.status(500).json({ error: "An error occurred while fetching images." });
        }
    }
    async postAlbum(req, res) {
        try {
            const data = req.body;
            const albumName = data.albumName;
            const { id } = req.user;
            const existsNameAlbum = await Album.isAlbumNameExists(albumName, id);
            if (!existsNameAlbum) {
                await Album.create(data, id);
                return res.status(201).json({ message: 'Create album successfully' });
            } else {
                return res.status(409).json({ message: 'Album name already exists' });
            }
        } catch (error) {
            console.error('Error uploading album:', error); // Log lỗi chi tiết
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async updateAlbum(req, res) {
        try {
            const { id } = req.user;
            const idAlbum = req.params.id;
            const { albumName, description } = req.body;
            //Hàm check xem đã có tên chưa 
            const isDuplicate = await Album.checkDuplicateAlbumName(albumName, id, idAlbum);
            if (isDuplicate) {
                return res.status(400).json({ message: 'AlbumName already exists.' });
            }
            // Thực hiện cập nhật
            const affectedRows = await Album.update(idAlbum, { albumName, description });
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Album not found or no changes made.' });
            }
            return res.status(200).json({ message: 'Album updated successfully.' });
        } catch (error) {
            console.error('Error updating album:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async deleteAlbum(req, res) {
        const id = req.params.id;
        try {
            const idAlbumExists = await AlbumImage.findByIdAlbum(id);
            if (idAlbumExists) {
                await AlbumImage.deleteByAlbumId(id);
            }
            const result = await Album.delete(id);

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