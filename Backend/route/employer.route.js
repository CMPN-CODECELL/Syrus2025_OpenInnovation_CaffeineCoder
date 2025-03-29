import express from "express";
import { getEmployerDashboard } from "../controllers/employer.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protected routes
router.get("/employer", authMiddleware, getEmployerDashboard);



export default router;