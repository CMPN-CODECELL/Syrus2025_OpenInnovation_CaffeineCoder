import mongoose from "mongoose";

const studyGroupSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    subject: { type: String, required: true },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    meetingSchedule: { type: String }, // e.g., "Every Sunday at 5 PM"
    resources: [{ type: String }] 
}, { timestamps: true });

const StudyGroup = mongoose.model("StudyGroup", studyGroupSchema);
export default StudyGroup;
