import express from 'express';
import AlbumImagesController from '../app/controllers/AlbumImagesController.js'
import auth from "../middleware/auth.js";
const router = express.Router();
router.all("*", auth);

router.get('/:slug', AlbumImagesController.showImagesFromAlbum);

router.post('/', AlbumImagesController.postImageToAlbum);

router.delete('/:id', AlbumImagesController.deleteImageFromAlbum);



export default router;