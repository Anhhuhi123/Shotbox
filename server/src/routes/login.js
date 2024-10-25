import express from "express";
import LoginController from '../app/controllers/LoginController.js'
import delay from "../middleware/auth.js";
const router = express.Router();
router.all("*", delay);
router.post('/', LoginController.login);

export default router;




