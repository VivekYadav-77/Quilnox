import { body } from 'express-validator';

const leadStatuses = ['New', 'Contacted', 'Qualified', 'Lost'];
const leadSources = ['Website', 'Instagram', 'Referral'];

export const createLeadValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name too long'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('status').optional().isIn(leadStatuses).withMessage('Invalid status'),
  body('source').isIn(leadSources).withMessage('Invalid source'),
];

export const updateLeadValidation = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Name too long'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Valid email required'),
  body('status').optional().isIn(leadStatuses).withMessage('Invalid status'),
  body('source').optional().isIn(leadSources).withMessage('Invalid source'),
];
