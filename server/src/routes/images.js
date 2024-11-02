import express from 'express';
import ImagesController from '../app/controllers/ImagesController.js'
import auth from "../middleware/auth.js";
import delay from "../middleware/auth.js";

const router = express.Router();
router.all("*", auth);

router.get('/', ImagesController.getAllImages);

router.post('/', ImagesController.postImages);

router.delete('/:id', ImagesController.deleteImages);

export default router;