import mongoose from "mongoose";

const mentorshipRequestSchema = new mongoose.Schema({
    mentee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    skillsRequested: { type: [String], required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Rejected", "Completed"], default: "Pending" },
    message: { type: String }
}, { timestamps: true });

const MentorshipRequest = mongoose.model("MentorshipRequest", mentorshipRequestSchema);
export default MentorshipRequest;
