import express from 'express';
import UserController from '../app/controllers/UserController.js'
import auth from "../middleware/auth.js";
const router = express.Router();

router.get('/username', UserController.findUserByUsername);

router.all("*", auth);

router.get('/roleId', UserController.getRoleId);

router.get('/account', UserController.getUser);

router.get('/:id', UserController.getUserById);

router.get('/', UserController.getAllUser)

router.put('/password', UserController.updateUserPassword);

router.put('/email', UserController.updateUserEmail);

router.delete('/:id', UserController.deleteUser);

export default router;