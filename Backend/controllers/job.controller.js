import { Job } from "../models/jobs.model.js";
import { Application } from "../models/application.model.js";
import { jobZodSchema } from "../zod-schemas/job.schema.js";

export const createJob = async (req, res) => {
  try {
    const validatedData = jobZodSchema.parse(req.body);
    
    // Debugging: Log the user object
    console.log("User from request:", req.user);
    
    const job = new Job({
      ...validatedData,
      postedBy: req.user._id || req.user.id // Handle both possibilities
    });
    
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error("Job creation error:", error);
    res.status(400).json({ 
      message: "Error creating job", 
      error: error.message,
      details: error.errors // This will show Zod validation errors if any
    });
  }
};

export const getJobApplications = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const applications = await Application.find({ jobId })
      .populate("applicantId", "name email")
      .populate("resumeId");
    
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;
    
    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );
    
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    
    // If status is "hired", close the job
    if (status === "hired") {
      await Job.findByIdAndUpdate(application.jobId, { status: "filled" });
    }
    
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Error updating application", error: error.message });
  }
};