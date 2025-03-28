// route/resume.route.js (remove initGemini call)
import express from 'express';
import { 
  generateResume,
  evaluateResume
} from '../controllers/resume.controller.js';

const router = express.Router();
router.post('/generate-resume', generateResume);
router.post('/evaluate-resume', evaluateResume);

export default router;