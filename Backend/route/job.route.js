import express from "express";
import { 
  createJob, 
  getJobApplications, 
  updateApplicationStatus 
} from "../controllers/job.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
// import { Application } from "../models/application.model.js";
import { Job } from "../models/jobs.model.js";
import { jobZodSchema } from "../zod-schemas/job.schema.js"; // Correct import path

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, createJob);
router.get("/:jobId/applications", authMiddleware, getJobApplications);
router.patch("/applications/:applicationId", authMiddleware, updateApplicationStatus);

router.post("/post-job", authMiddleware, async (req, res) => {
  try {
    // Transform and prepare data
    const requirements = Array.isArray(req.body.requirements) 
      ? req.body.requirements
      : [req.body.requirements].filter(Boolean);

    const skillsRequired = Array.isArray(req.body.skillsRequired)
      ? req.body.skillsRequired
      : [req.body.skillsRequired].filter(Boolean);

    const jobData = {
      ...req.body,
      requirements,
      skillsRequired,
      postedBy: req.user.id,
      salary: req.body.salary ? Number(req.body.salary) : undefined,
      deadline: req.body.deadline ? new Date(req.body.deadline) : undefined
    };

    // Validate with Zod
    const validatedData = jobZodSchema.parse(jobData);

    // Create job
    const job = await Job.create(validatedData);

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      data: {
        id: job._id,
        title: job.title,
        status: job.status,
        postedAt: job.postedAt
      }
    });

  } catch (error) {
    console.error("Job creation error:", error);
    
    // Zod validation errors
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    }

    // Other errors
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create job"
    });
  }
});

export default router;