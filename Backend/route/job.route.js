import express from "express";
import { createJob, getJobs, getJobDetails, updateJob, deleteJob } from "../controllers/job.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, createJob);
router.get("/", getJobs);
router.get("/:id", getJobDetails);
router.put("/:id", authMiddleware, updateJob);
router.delete("/:id", authMiddleware, deleteJob);

export default router;