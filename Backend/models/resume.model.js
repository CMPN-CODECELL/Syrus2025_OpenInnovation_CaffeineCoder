import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    resumeData: { type: Object, required: true }, // Stores structured resume content
    lastUpdated: { type: Date, default: Date.now },
    isPublic: { type: Boolean, default: false }
});

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
