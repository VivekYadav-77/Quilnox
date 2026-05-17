import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate, authorize } from '../middleware/auth';
import { login, register } from '../controllers/authController';

const router = Router();

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('role').optional().isIn(['admin', 'sales']).withMessage('Invalid role'),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

router.get('/me', authenticate, (req, res) => {
  res.json({ success: true, data: req.user });
});

router.get('/admin-check', authenticate, authorize('admin'), (_req, res) => {
  res.json({ success: true, message: 'Admin access granted' });
});

export default router;
