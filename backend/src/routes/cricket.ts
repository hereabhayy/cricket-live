import { Router } from 'express';
import CricketController from '../controllers/cricketController';

const router = Router();
const cricketController = new CricketController();

router.get('/live-scores', cricketController.getLiveScores.bind(cricketController));
router.get('/match/:id', cricketController.getMatchDetails.bind(cricketController));

export default router;