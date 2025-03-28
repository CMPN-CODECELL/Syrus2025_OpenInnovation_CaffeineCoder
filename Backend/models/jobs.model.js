import mongoose from "mongoose";
import { JOB_STATUS } from "../utils/enums";

const jobSchema = new mongoose.Schema({
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