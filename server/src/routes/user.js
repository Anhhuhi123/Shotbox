import express from 'express';
import UserController from '../app/controllers/UserController.js'
<<<<<<< HEAD
import auth from '../middleware/auth.js';
const router = express.Router();
router.all("*", auth);
=======
import auth from "../middleware/auth.js";
const router = express.Router();
>>>>>>> tien

router.get('/username', UserController.findUserByUsername);

router.all("*", auth);

router.get('/roleId', UserController.getRoleId);

// change role 
router.put('/roleId', UserController.ChangeRoleId);

router.put('/capacity', UserController.UpdateUserCapacity);

router.get('/account', UserController.getAccount);

router.get('/:id', UserController.getUserById);

router.get('/', UserController.showAllUser)

router.put('/password', UserController.updateUserPassword);

router.put('/email', UserController.updateUserEmail);



export default router;