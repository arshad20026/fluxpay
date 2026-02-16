import { Router } from 'express';
import { sendMoney, getHistory } from '../controllers/transactionController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/send', authenticateUser, sendMoney);
router.get('/history', authenticateUser, getHistory);

export default router;
