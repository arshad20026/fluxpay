import { Router } from 'express';
import { 
    getBalance, 
    searchUsers, 
    getProfile,
    updateProfile,
    addFunds,
    getCards,
    createCard,
    getRewards,
    getCrypto,
    getAnalytics
} from '../controllers/userController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/balance', authenticateUser, getBalance);
router.get('/search', authenticateUser, searchUsers);
router.get('/profile', authenticateUser, getProfile);
router.put('/profile', authenticateUser, updateProfile);
router.post('/add-funds', authenticateUser, addFunds);
router.get('/cards', authenticateUser, getCards);
router.post('/cards', authenticateUser, createCard);
router.get('/rewards', authenticateUser, getRewards);
router.get('/crypto', authenticateUser, getCrypto);
router.get('/analytics', authenticateUser, getAnalytics);

export default router;
