import Album from '../models/Album.js';
import AlbumImage from '../models/AlbumImage.js';

class AlbumController {
    // Get localhost/album/
    async showAllAlbums(req, res) {
        try {
            const { id, name, email } = req.user; // data handle from middleware
            const albums = await Album.getAllAlbums(id);

            return res.status(200).json({ data: albums });
        } catch (error) {
            console.error("Error fetching images:", error); // Log lỗi chi tiết
            return res.status(500).json({ error: "An error occurred while fetching images." });
        }
    }
    async showAlbumDetail(req, res) {
        try {
            // const { id, name, email } = req.user; // data handle from middleware
            const urlParams = req.params.id;
            const albums = await Album.findAlbumByUrlParams(urlParams);

            return res.status(200).json({ data: albums });
        } catch (error) {
            console.error("Error fetching images:", error); // Log lỗi chi tiết
            return res.status(500).json({ error: "An error occurred while fetching images." });
        }
    }

    // Post localhost/album/
    async postAlbum(req, res) {
        try {
            const data = req.body;
            const { id, name, email } = req.user;

            await Album.create(data, id);
            return res.status(201).json({ data: 'Create ablum successfully' });
        } catch (error) {
            console.error('Error uploading image:', error); // Log lỗi chi tiết
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Update
    async updateAlbum(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            const affectedRows = await Album.update(id, data);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Album not found or no changes made' });
            }
            return res.status(200).json({ message: 'Album updated successfully' });
        } catch (error) {
            console.error('Error updating album:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    // Delete
    async deleteAlbum(req, res) {

    }
}

export default new AlbumController();