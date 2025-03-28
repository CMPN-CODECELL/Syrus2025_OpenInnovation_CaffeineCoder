import express from 'express';
import { 
  getDashboardStats, 
  getTodaysSessions,
  getMentorshipRequests,
  approveRequest,
  declineRequest,
  validateSkill
} from '../controllers/mentorship.controller.js';
import { authMiddleware, restrictTo } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protect all routes with authentication and mentor role
router.use(authMiddleware);
router.use(restrictTo('Mentor'));

// Dashboard routes
router.get('/dashboard/stats', getDashboardStats);
router.get('/dashboard/today-sessions', getTodaysSessions);

// Mentorship request routes
router.get('/requests', getMentorshipRequests);
router.patch('/requests/:requestId/approve', approveRequest);
router.patch('/requests/:requestId/decline', declineRequest);

// Skill validation route
router.post('/validate-skill', validateSkill);

export default router;