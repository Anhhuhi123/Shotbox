import express from 'express';
import HistoryUpgradeController from '../app/controllers/HistoryUpgradeController.js'
import auth from "../middleware/auth.js";
const router = express.Router();
router.all("*", auth);
router.get('/success', HistoryUpgradeController.showUpgradeSuccess);
router.get('/pending/:id', HistoryUpgradeController.showUpgradePending);
router.get('/pending', HistoryUpgradeController.showHistoryUpgradePading);
router.get('/', HistoryUpgradeController.showAllHistoryUpgrades);
router.post('/', HistoryUpgradeController.postHistoryUpgrade);
// router.delete('/:id', ImagesController.deleteImages);

export default router;