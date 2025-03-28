import mongoose from "mongoose";

const skillSwapSchema = new mongoose.Schema({
    userA: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userB: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    skillOfferedByA: { type: [String], required: true },
    skillOfferedByB: { type: [String], required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Completed", "Cancelled"], default: "Pending" },
    tokensUsed: { type: Number, required: true }
}, { timestamps: true });

const SkillSwap = mongoose.model("SkillSwap", skillSwapSchema);
export default SkillSwap;
