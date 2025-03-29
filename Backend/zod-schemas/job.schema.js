import { z } from "zod";

const dateStringSchema = z.string().refine(val => !isNaN(Date.parse(val)), {
  message: "Invalid date format"
});

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
    { 
      errorMap: () => ({ 
        message: "Must be one of: full-time, part-time, contract, internship" 
      }) 
    }
  ),
  
  postedBy: z.string().refine(
    val => /^[0-9a-fA-F]{24}$/.test(val),
    { message: "Invalid user ID format" }
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
  
  deadline: z.union([dateStringSchema, z.date()])
    .transform(val => new Date(val))
    .refine(val => val > new Date(), "Deadline must be in the future")
    .optional(),
  
  status: z.enum(["open", "closed", "filled"])
    .default("open")
}).strict();

export const jobUpdateZodSchema = jobZodSchema
  .partial()
  .strict()
  .refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update"
  });

export const jobFilterZodSchema = z.object({
  title: z.string().optional(),
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
  status: z.enum(["open", "closed", "filled"]).optional(),
  postedBy: z.string().optional()
}).strict();