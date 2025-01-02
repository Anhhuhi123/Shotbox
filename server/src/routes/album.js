import express from 'express';
<<<<<<< HEAD
import AlbumController from '../app/controllers/AlbumController.js';
// import delay from "../middleware/auth.js";

const router = express.Router();
// router.all("*", delay);

router.get('/', AlbumController.getAllAlbums);

router.post('/', AlbumController.postAlbums);

router.delete('/:id', AlbumController.deleteAlbums);
=======
import AlbumController from '../app/controllers/AlbumController.js'
import auth from "../middleware/auth.js";
const router = express.Router();
router.all("*", auth);

router.get('/:id', AlbumController.showAlbumDetail);
router.get('/', AlbumController.showAllAlbums);
router.post('/', AlbumController.createNewAlbum);
router.delete('/:id', AlbumController.deleteAlbum);
router.put('/:id', AlbumController.updateAlbum);
>>>>>>> tien

export default router;