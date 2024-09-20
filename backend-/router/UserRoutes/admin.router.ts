import express from 'express';
import { body } from 'express-validator';
import { registerAdmin } from '../../controller/admin.controller'; // Adjust path if necessary
import { authenticate } from '../../authentication/jwtAuth';
const router = express.Router();

// Validation middleware
const signupValidation = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];


router.post('/register', authenticate,signupValidation,registerAdmin);

export default router;