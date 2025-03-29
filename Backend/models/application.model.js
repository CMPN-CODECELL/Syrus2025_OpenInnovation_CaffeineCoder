import mongoose from "mongoose";
import { z } from "zod";

export const applicationZodSchema = z.object({
  jobId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
  applicantId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
  resumeId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
  coverLetter: z.string().optional(),
  status: z.enum(["pending", "reviewed", "rejected", "hired"]).default("pending"),
  appliedAt: z.date().default(() => new Date()),
});

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "Resume", required: true },
  coverLetter: { type: String },
  status: { type: String, enum: ["pending", "reviewed", "rejected", "hired"], default: "pending" },
  appliedAt: { type: Date, default: Date.now },
});

export const Application = mongoose.model("Application", applicationSchema);