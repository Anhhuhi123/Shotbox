import  express  from "express";
import Deleted_ImagesController from '../app/controllers/Deleted_ImagesController'
import delay from '../middleware/auth'
const router = express.Router();

router.all("*",delay);

router.get('/',Deleted_ImagesController.getAllImages_Deleted);

router.post('/',Deleted_ImagesController.restoreImages);

export default router;