import express from 'express';
const router = express.Router();
import employerController from '../controllers/employer.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';


router.get('/dashboard', authMiddleware, employerController.getEmployerDashboard);

// Other employer routes:
// - Post job
// - Manage applications
// - View candidates
// etc.

export default router;