import express from "express";
<<<<<<< HEAD
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
=======
import { createJob, getJobs, getJobDetails, updateJob, deleteJob } from "../controllers/job.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, createJob);
router.get("/", getJobs);
router.get("/:id", getJobDetails);
router.put("/:id", authMiddleware, updateJob);
router.delete("/:id", authMiddleware, deleteJob);
>>>>>>> 40bf442a423ee9d8efc337c0087c449288179ab9

export default router;