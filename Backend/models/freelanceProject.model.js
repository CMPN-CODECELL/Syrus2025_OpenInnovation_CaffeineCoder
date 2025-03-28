import mongoose from "mongoose";

const freelanceProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    budget: { min: Number, max: Number },
    deadline: { type: Date, required: true },
    requiredSkills: { type: [String], required: true },
    proposals: [{
        freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        proposalText: { type: String },
        bidAmount: { type: Number },
        status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" }
    }],
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["Open", "In Progress", "Completed", "Cancelled"], default: "Open" }
}, { timestamps: true });

const FreelanceProject = mongoose.model("FreelanceProject", freelanceProjectSchema);
export default FreelanceProject;
