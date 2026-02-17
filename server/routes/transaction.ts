import { Router } from 'express';
import { 
    sendMoney, 
    getHistory,
    getRecurring,
    createRecurring,
    splitBill,
    getSplits
} from '../controllers/transactionController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/send', authenticateUser, sendMoney);
router.get('/history', authenticateUser, getHistory);
router.get('/recurring', authenticateUser, getRecurring);
router.post('/recurring', authenticateUser, createRecurring);
router.post('/split', authenticateUser, splitBill);
router.get('/split/:id', authenticateUser, getSplits);

export default router;
