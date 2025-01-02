import express from 'express';
import ImagesController from '../app/controllers/ImagesController.js'
import auth from "../middleware/auth.js";
<<<<<<< HEAD
import delay from "../middleware/auth.js";

=======
>>>>>>> tien
const router = express.Router();
router.all("*", auth);


router.get('/', ImagesController.showAllImage);

router.post('/', ImagesController.postImages);

router.post('/delete/multiple', ImagesController.deleteMultiple);

router.delete('/:id', ImagesController.deleteImages);

export default router;