import express from 'express';
import HistoryUpgradeController from '../app/controllers/HistoryUpgradeController.js'
import auth from "../middleware/auth.js";
const router = express.Router();
router.all("*", auth);
router.get('/panding', HistoryUpgradeController.showHistoryUpgradePading);
router.get('/', HistoryUpgradeController.showAllHistoryUpgrades);
router.post('/', HistoryUpgradeController.postHistoryUpgrade);
// router.delete('/:id', ImagesController.deleteImages);

export default router;