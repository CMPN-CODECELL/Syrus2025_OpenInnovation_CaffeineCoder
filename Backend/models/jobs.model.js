import mongoose from "mongoose";
import { z } from "zod";

// Zod schema for validation
export const jobZodSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  requirements: z.array(z.string()),
  location: z.string().optional(),
  salary: z.number().optional(),
  employmentType: z.enum(["full-time", "part-time", "contract", "internship"]),
  postedBy: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
  status: z.enum(["open", "closed", "filled"]).default("open"),
  applications: z.array(z.string()).optional(),
  postedAt: z.date().default(() => new Date()),
});

const jobSchema = new mongoose.Schema({
<<<<<<< HEAD
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  location: { type: String },
  salary: { type: Number },
  employmentType: { type: String, enum: ["full-time", "part-time", "contract", "internship"] },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["open", "closed", "filled"], default: "open" },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
  postedAt: { type: Date, default: Date.now },
});

export const Job = mongoose.model("Job", jobSchema);
=======
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String, 
        required: true
    },
    jobType: {
        type: String,
        enum: ["Full-time", "Part-time", "Internship", "Contract", "Freelance"],
        required: true
    },
    salaryRange: {
        min: { type: Number },
        max: { type: Number }
    },
    requiredSkills: {
        type: [String],
        required: true
    },
    preferredSkills: {
        type: [String],
        default: []
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employer",
        required: true
    },
    applicants: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: { 
            type: String, 
            enum: ["Applied", "Interviewing", "Hired", "Rejected"], 
            default: "Applied" 
        },
        appliedAt: { 
            type: Date, 
            default: Date.now 
        },
        matchScore: { 
            type: Number 
        }
    }],
    status: {
        type: String,
        enum: Object.values(JOB_STATUS),
        default: JOB_STATUS.OPEN
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
        required: true
    },
    isRemote: {
        type: Boolean,
        default: false
    },
    experienceLevel: {
        type: String,
        enum: ["Entry", "Mid", "Senior", "Lead", "Executive"],
        required: true
    }
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);

export default Job;
>>>>>>> 40bf442a423ee9d8efc337c0087c449288179ab9
