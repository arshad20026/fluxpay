import { Router } from 'express';
import {
    getBeneficiaries,
    addBeneficiary,
    updateBeneficiary,
    deleteBeneficiary
} from '../controllers/beneficiaryController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateUser);

router.get('/', getBeneficiaries);
router.post('/', addBeneficiary);
router.put('/:id', updateBeneficiary);
router.delete('/:id', deleteBeneficiary);

export default router;
