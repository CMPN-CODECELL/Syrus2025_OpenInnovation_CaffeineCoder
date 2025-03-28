import { z } from "zod";

// Common string validations
const nonEmptyString = z.string().min(1, "Cannot be empty").trim();
const optionalString = z.string().optional().or(z.literal('')).default('');
const emailSchema = z.string().email("Invalid email format").toLowerCase().trim();
const urlSchema = z.string().url("Invalid URL").optional().or(z.literal('')).default('');

// Project Schema
export const ProjectSchema = z.object({
  title: nonEmptyString.max(100, "Title too long"),
  description: nonEmptyString.max(500, "Description too long"),
  skillsUsed: z.array(nonEmptyString).max(20, "Too many skills").default([]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

// User Register Schema
export const UserRegisterSchema = z.object({
  name: nonEmptyString.max(50, "Name too long"),
  email: emailSchema,
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["Learner", "Mentor", "Employer"]).default("Learner"),
  
  // Updated fields with proper optional handling
  profilePicture: urlSchema.default("default_profile.png"),
  skills: z.array(nonEmptyString).max(20, "Too many skills").default([]),
  wantToLearn: z.array(nonEmptyString).max(20, "Too many skills").default([]),
  education: z.string().max(100, "Too long").default(''),
  experience: z.array(z.string().max(200)).max(10, "Too many entries").default([]),
  bio: z.string().max(500, "Bio too long").default(''),
  resume: urlSchema,
  portfolio: urlSchema,
  
  // Complex objects with proper defaults
  jobApplications: z.array(
    z.object({
      jobId: z.string().uuid("Invalid job ID"),
      status: z.enum(["Applied", "Interviewing", "Accepted", "Rejected"]).default("Applied"),
      appliedAt: z.coerce.date().optional()
    }).strict()
  ).max(100, "Too many applications").default([]),
  
  freelanceProjects: z.array(
    z.object({
      projectId: z.string().uuid("Invalid project ID"),
      status: z.enum(["Ongoing", "Completed", "Cancelled"]).default("Ongoing")
    }).strict()
  ).max(50, "Too many projects").default([]),
  
  transactions: z.array(
    z.object({
      type: z.enum(["Earned", "Spent"]),
      amount: z.number().positive("Amount must be positive"),
      description: nonEmptyString.max(100, "Description too long"),
      date: z.coerce.date().optional()
    }).strict()
  ).max(200, "Too many transactions").default([]),
  
  // Basic fields with defaults
  tokens: z.number().int().nonnegative("Tokens cannot be negative").default(10),
  points: z.number().int().nonnegative("Points cannot be negative").default(0),
  rating: z.number().min(0).max(5).default(0),
  
  // Arrays with defaults
  endorsements: z.array(
    z.object({
      skill: nonEmptyString.max(50, "Skill name too long"),
      endorsedBy: z.string().uuid("Invalid user ID")
    }).strict()
  ).max(100, "Too many endorsements").default([]),
  
  reviews: z.array(
    z.object({
      userId: z.string().uuid("Invalid user ID"),
      comment: nonEmptyString.max(500, "Comment too long"),
      rating: z.number().min(0).max(5)
    }).strict()
  ).max(100, "Too many reviews").default([]),
  
  projects: z.array(ProjectSchema).max(50, "Too many projects").default([]),
  mentee: z.array(z.string().uuid("Invalid user ID")).max(50, "Too many mentees").default([]),
  mentor: z.array(z.string().uuid("Invalid user ID")).max(50, "Too many mentors").default([]),
  badges: z.array(nonEmptyString.max(30)).max(20, "Too many badges").default([]),
  
  // Social links with proper empty string handling
  socialLinks: z.object({
    linkedIn: urlSchema,
    github: urlSchema,
    twitter: urlSchema
  }).strict().default({
    linkedIn: '',
    github: '',
    twitter: ''
  }),
  
  // Verification status with defaults
  verificationStatus: z.object({
    emailVerified: z.boolean().default(false),
    skillVerified: z.boolean().default(false),
    mentorApproved: z.boolean().default(false)
  }).strict().default({ 
    emailVerified: false, 
    skillVerified: false, 
    mentorApproved: false 
  })
}).strict();

// User Login Schema
export const UserLoginSchema = z.object({
  email: emailSchema,
  password: nonEmptyString
}).strict();

// User Update Schema
export const UserUpdateSchema = UserRegisterSchema
  .omit({ password: true, role: true })
  .partial()
  .strict();