import { Router } from 'express';
import {
  createLead,
  deleteLead,
  getLeadById,
  getLeads,
  updateLead,
} from '../controllers/leadController';
import { authenticate, authorize } from '../middleware/auth';
import {
  createLeadValidation,
  updateLeadValidation,
} from '../middleware/leadValidation';

const router = Router();

router.use(authenticate);

router.get('/', getLeads);
router.get('/:id', getLeadById);
router.post('/', createLeadValidation, createLead);
router.put('/:id', updateLeadValidation, updateLead);
router.delete('/:id', authorize('admin'), deleteLead);

export default router;
