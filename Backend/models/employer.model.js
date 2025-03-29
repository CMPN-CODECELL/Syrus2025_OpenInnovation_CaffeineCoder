import mongoose from "mongoose";

const employerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    logo: {
        type: String, 
        default: "default_logo.png"
    },
    industry: {
        type: String,
        required: true
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job" 
    }],
    applicants: [{
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: { type: String, enum: ["Applied", "Interviewing", "Hired", "Rejected"], default: "Applied" },
        applicationDate: { type: Date, default: Date.now }
    }],
    talentMatches: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
        matchPercentage: { type: Number },
        matchDate: { type: Date, default: Date.now }
    }],
    verified: {
        type: Boolean,
        default: false 
    }
}, { timestamps: true });

const Employer = mongoose.model('Employer', employerSchema);

export default Employer;