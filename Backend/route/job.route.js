import express from "express";
import { 
  createJob, 
  getJobApplications, 
  updateApplicationStatus 
} from "../controllers/job.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, createJob);
router.get("/:jobId/applications", authMiddleware, getJobApplications);
router.patch("/applications/:applicationId", authMiddleware, updateApplicationStatus);

export default router;