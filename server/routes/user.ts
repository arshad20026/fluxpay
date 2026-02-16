import { Router } from 'express';
import { getBalance, searchUsers, getProfile } from '../controllers/userController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/balance', authenticateUser, getBalance);
router.get('/search', authenticateUser, searchUsers);
router.get('/profile', authenticateUser, getProfile);

export default router;
