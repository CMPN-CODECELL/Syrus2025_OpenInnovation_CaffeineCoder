import { z } from "zod";

export const jobZodSchema = z.object({
  title: z.string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title cannot exceed 100 characters"),
  
  description: z.string()
    .min(10, "Description must be at least 10 characters long")
    .max(2000, "Description cannot exceed 2000 characters"),
  
  requirements: z.array(
    z.string().min(2, "Each requirement must be at least 2 characters long")
  ).nonempty("At least one requirement is required"),
  
  location: z.string()
    .min(2, "Location must be at least 2 characters long")
    .max(100, "Location cannot exceed 100 characters")
    .optional(),
  
  salary: z.number()
    .min(0, "Salary cannot be negative")
    .optional(),
  
  employmentType: z.enum(
    ["full-time", "part-time", "contract", "internship"], 
    { message: "Invalid employment type" }
  ),
  
  skillsRequired: z.array(
    z.string().min(2, "Each skill must be at least 2 characters long")
  ).nonempty("At least one skill is required"),
  
  experienceLevel: z.enum(
    ["entry", "mid", "senior", "lead"],
    { message: "Invalid experience level" }
  ).optional(),
  
  remote: z.boolean().optional(),
  
  benefits: z.array(
    z.string().min(2, "Each benefit must be at least 2 characters long")
  ).optional(),
  
  deadline: z.date()
    .min(new Date(), "Deadline must be in the future")
    .optional(),
  
  status: z.enum(
    ["open", "closed", "filled"],
    { message: "Invalid job status" }
  ).default("open")
}).strict();

// Schema for updating a job (makes all fields optional)
export const jobUpdateZodSchema = jobZodSchema.partial().strict();

// Schema for job application filters
export const jobFilterZodSchema = z.object({
  employmentType: z.enum(
    ["full-time", "part-time", "contract", "internship"]
  ).optional(),
  experienceLevel: z.enum(
    ["entry", "mid", "senior", "lead"]
  ).optional(),
  remote: z.boolean().optional(),
  minSalary: z.number().min(0).optional(),
  maxSalary: z.number().min(0).optional(),
  skills: z.array(z.string()).optional(),
  status: z.enum(["open", "closed", "filled"]).optional()
}).strict();