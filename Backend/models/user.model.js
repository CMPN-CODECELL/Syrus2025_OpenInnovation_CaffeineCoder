import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    role: {
        type: String,
        enum: ["Learner", "Mentor", "Employer"],
        default: "Learner"
    },
    profilePicture: {
        type: String, // URL to profile image
        default: "default_profile.png"
    },

    skills: {
        type: [String]
    },
    wantToLearn: {
        type: [String]
    },
    education: {
        type: String
    },
    experience: {
        type: [String]
    },
    bio: {
        type: String
    },
    resume: {
        type: String 
    },
    portfolio: {
        type: String 
    },
    jobApplications: [{
        jobId: String, 
        status: { type: String, enum: ["Applied", "Interviewing", "Accepted", "Rejected"], default: "Applied" },
        appliedAt: { type: Date, default: Date.now }
    }],
    freelanceProjects: [{
        projectId: String, 
        status: { type: String, enum: ["Ongoing", "Completed", "Cancelled"], default: "Ongoing" }
    }],
    transactions: [{
        type: { type: String, enum: ["Earned", "Spent"] },
        amount: { type: Number },
        description: { type: String },
        date: { type: Date, default: Date.now }
    }],
    tokens: {
        type: Number, 
        default: 0
    },
    endorsements: [{
        skill: String,
        endorsedBy: String 
    }],
    rating: {
        type: Number,
        default: 0
    },
    reviews: [{
        userId: String, 
        comment: String,
        rating: Number
    }],
    points: {
        type: Number,
        default: 0
    },
    projects: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Project'
    },
    mentee: {
        type: [String] 
    },
    mentor: {
        type: [String] 
    },
    badges: {
        type: [String] 
    },
    socialLinks: {
        linkedIn: { type: String },
        github: { type: String },
        twitter: { type: String }
    },
    verificationStatus: {
        emailVerified: { type: Boolean, default: false },
        skillVerified: { type: Boolean, default: false },
        mentorApproved: { type: Boolean, default: false }
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
