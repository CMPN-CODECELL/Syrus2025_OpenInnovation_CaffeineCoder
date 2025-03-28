import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
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
    website: {
        type: String
    },
    industry: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job" 
    }],
    applicants: [{
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: { type: String, enum: ["Applied", "Interviewing", "Hired", "Rejected"], default: "Applied" }
    }],
    verified: {
        type: Boolean,
        default: false 
    }
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);

export default Company;
