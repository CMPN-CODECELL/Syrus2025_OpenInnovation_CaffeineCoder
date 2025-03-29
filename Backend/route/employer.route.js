import express from "express";
import { getEmployerDashboard } from "../controllers/employer.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { Job } from "../models/jobs.model.js";
import { Application } from "../models/application.model.js";
import User from "../models/user.model.js";
import Employer from "../models/employer.model.js";

const router = express.Router();

// Protected routes
router.get("/employer", authMiddleware, getEmployerDashboard);

router.get("/dashboard", authMiddleware, async (req, res) => {
    try {
      const employerId = req.user.id;
  
      // 1. Get active listings count
      const activeListings = await Job.countDocuments({
        postedBy: employerId,
        status: "open"
      });
  
      // 2. Get total applicants across all jobs
      const jobs = await Job.find({ postedBy: employerId });
      const jobIds = jobs.map(job => job._id);
      const totalApplicants = await Application.countDocuments({
        jobId: { $in: jobIds }
      });
  
      // 3. Get positions filled count
      const positionsFilled = await Job.countDocuments({
        postedBy: employerId,
        status: "filled"
      });
  
      // 4. Get talent matches (using employer model)
      const employer = await Employer.findById(employerId)
        .populate({
          path: "talentMatches.userId",
          select: "name skills title"
        })
        .populate({
          path: "talentMatches.jobId",
          select: "title"
        });
  
    //   const talentMatches = employer.talentMatches.length;
  
      // 5. Get 2 most recent applications with details
      const recentApplications = await Application.find({
        jobId: { $in: jobIds }
      })
      .sort({ appliedAt: -1 })
      .limit(2)
      .populate("jobId", "title")
      .populate("applicantId", "name");
  
      // Format the response
      const dashboardData = {
        activeListings,
        totalApplicants,
        positionsFilled,
        // talentMatches,
        recentApplications: recentApplications.map(app => ({
          jobTitle: app.jobId.title,
          applicantName: app.applicantId.name,
          appliedAt: app.appliedAt,
          status: app.status,
          resumeId: app.resumeId?._id
        })),
        // talentMatchesDetails: employer.talentMatches.map(match => ({
        //   candidateName: match.userId.name,
        //   candidateSkills: match.userId.skills,
        //   candidateTitle: match.userId.title,
        //   jobTitle: match.jobId?.title || "General Match",
        //   matchPercentage: match.matchPercentage,
        //   matchDate: match.matchDate
        // }))
      };
  
      res.status(200).json(dashboardData);
  
    } catch (error) {
      console.error("Error fetching employer dashboard:", error);
      res.status(500).json({
        message: "Failed to fetch employer dashboard data",
        error: error.message
      });
    }
  });

export default router;