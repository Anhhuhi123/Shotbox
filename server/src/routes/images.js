import express from 'express';
import ImagesController from '../app/controllers/ImagesController.js'
<<<<<<< HEAD
// import delay from "../middleware/auth.js";
const router = express.Router();
// router.all("*", delay);
=======
import auth from "../middleware/auth.js";
import delay from "../middleware/auth.js";

const router = express.Router();
router.all("*", auth);
>>>>>>> anh_new

router.get('/', ImagesController.getAllImages);

router.post('/', ImagesController.postImages);

router.delete('/:id', ImagesController.deleteImages);

export default router;