import express from 'express';
import DeletedImagesController from '../app/controllers/DeletedImagesController.js'
import auth from "../middleware/auth.js";
const router = express.Router();
router.all("*", auth);
router.get('/', DeletedImagesController.showAllDeletedImages);
router.delete('/restore/:id', DeletedImagesController.restoreDeletedImages);
router.delete('/:id', DeletedImagesController.removeDeletedImages);


export default router;