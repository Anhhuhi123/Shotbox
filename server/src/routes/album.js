import express from 'express';
import AlbumController from '../app/controllers/AlbumController.js'
import auth from "../middleware/auth.js";
const router = express.Router();
router.all("*", auth);

router.get('/:id', AlbumController.showAlbumDetail);
router.get('/', AlbumController.showAllAlbums);
router.post('/', AlbumController.postAlbum);
router.delete('/:id', AlbumController.deleteAlbum);

export default router;