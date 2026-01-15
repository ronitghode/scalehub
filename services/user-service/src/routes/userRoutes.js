import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.post('/profile', protect, updateProfile);

export default router;
