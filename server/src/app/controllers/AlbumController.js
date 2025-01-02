<<<<<<< HEAD
import Albums from '../models/Albums.js';

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
    // Delete
    async deleteAlbums(req, res) {
        const id = req.params.id;
        try {
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
=======
import AlbumService from '../services/AlbumService.js';

class AlbumController {
    async showAllAlbums(req, res) {
        try {
            const { id } = req.user;
            const albums = await AlbumService.getAllAlbums(id);
            return res.status(200).json({ data: albums });
        } catch (error) {
            console.error("Error fetching albums:", error);
            if (error.statusCode) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async showAlbumDetail(req, res) {
        try {
            const urlParams = req.params.id;
            const albumDetail = await AlbumService.findAlbumByUrlParams(urlParams);
            return res.status(200).json({ data: albumDetail });
        } catch (error) {
            console.error("Error fetching album detail:", error);
            if (error.statusCode) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async createNewAlbum(req, res) {
        try {
            const data = req.body;
            const albumName = data.albumName;
            if (!albumName) {
                return res.status(400).json({ message: 'Album name is required' });
            }
            const { id } = req.user;
            const album = await AlbumService.createAlbum(data, id);
            return res.status(201).json({ message: 'Album created successfully', album });
        } catch (error) {
            console.error('Error creating album:', error);
            if (error.statusCode) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async updateAlbum(req, res) {
        try {
            const { id } = req.user;
            const albumId = req.params.id;
            const { albumName, description } = req.body;
            const updatedAlbum = await AlbumService.updateAlbum(albumId, { albumName, description }, id);
            return res.status(200).json({ message: 'Album updated successfully.', album: updatedAlbum });
        } catch (error) {
            console.error('Error updating album:', error);
            if (error.statusCode) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async deleteAlbum(req, res) {
        try {
            const id = req.params.id;
            const result = await AlbumService.deleteAlbum(id);
            if (result) {
                return res.status(200).json({ message: `Album with ID ${id} has been deleted` });
            }
        } catch (error) {
            console.error("Error deleting album:", error);
            if (error.statusCode) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new AlbumController();
>>>>>>> tien
