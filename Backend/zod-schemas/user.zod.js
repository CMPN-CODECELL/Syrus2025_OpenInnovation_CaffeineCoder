import { z } from "zod";

export const ProjectSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    skillsUsed: z.array(z.string()).optional(),
    createdAt: z.preprocess((val) => new Date(val), z.date()).optional(),
    updatedAt: z.preprocess((val) => new Date(val), z.date()).optional()
});

export const UserRegisterSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["Learner" , "Mentor" , "Employer"]).default("User"),
    profilePicture: z.string().default("default_profile.png"),
    skills: z.array(z.string()).optional(),
    wantToLearn: z.array(z.string()).optional(),
    education: z.string().optional(),
    experience: z.array(z.string()).optional(),
    bio: z.string().optional(),
    resume: z.string().optional(),
    portfolio: z.string().optional(),
    jobApplications: z.array(
        z.object({
            jobId: z.string(),
            status: z.enum(["Applied", "Interviewing", "Accepted", "Rejected"]).default("Applied"),
            appliedAt: z.preprocess((val) => new Date(val), z.date()).optional() // ✅ Converts string to Date
        })
    ).optional(),
    freelanceProjects: z.array(
        z.object({
            projectId: z.string(),
            status: z.enum(["Ongoing", "Completed", "Cancelled"]).default("Ongoing")
        })
    ).optional(),
    transactions: z.array(
        z.object({
            type: z.enum(["Earned", "Spent"]),
            amount: z.number(),
            description: z.string(),
            date: z.preprocess((val) => new Date(val), z.date()).optional() // ✅ Converts string to Date
        })
    ).optional(),
    tokens: z.number().default(0),
    endorsements: z.array(
        z.object({
            skill: z.string(),
            endorsedBy: z.string()
        })
    ).optional(),
    rating: z.number().default(0),
    reviews: z.array(
        z.object({
            userId: z.string(),
            comment: z.string(),
            rating: z.number()
        })
    ).optional(),
    points: z.number().default(0),
    projects: z.array(ProjectSchema).optional(),
    mentee: z.array(z.string()).optional(),
    mentor: z.array(z.string()).optional(),
    badges: z.array(z.string()).optional(),
    socialLinks: z.object({
        linkedIn: z.string().optional(),
        github: z.string().optional(),
        twitter: z.string().optional()
    }).optional(),
    verificationStatus: z.object({
        emailVerified: z.boolean().default(false),
        skillVerified: z.boolean().default(false),
        mentorApproved: z.boolean().default(false)
    }).default({ emailVerified: false, skillVerified: false, mentorApproved: false })
});


// Schema for User Login
export const UserLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
