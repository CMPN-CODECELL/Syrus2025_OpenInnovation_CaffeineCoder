import mongoose from "mongoose";
import { z } from "zod";

// Zod schema for validation
export const jobZodSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  requirements: z.array(z.string()),
  location: z.string().optional(),
  salary: z.number().optional(),
  employmentType: z.enum(["full-time", "part-time", "contract", "internship"]),
  postedBy: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
  status: z.enum(["open", "closed", "filled"]).default("open"),
  applications: z.array(z.string()).optional(),
  postedAt: z.date().default(() => new Date()),
});

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  location: { type: String },
  salary: { type: Number },
  employmentType: { type: String, enum: ["full-time", "part-time", "contract", "internship"] },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["open", "closed", "filled"], default: "open" },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
  postedAt: { type: Date, default: Date.now },
});

export const Job = mongoose.model("Job", jobSchema);