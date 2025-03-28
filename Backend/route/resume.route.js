// route/resume.route.js (remove initGemini call)
import express from 'express';
import { 
  generateResume,
  evaluateResume
} from '../controllers/resume.controller.js';

const router = express.Router();
// import * from "../controller/resume.controller.js";

// router.route("/generate-resume").post(generateResume);

// router.route

export default router;