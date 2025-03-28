import express from 'express';
import dotenv from 'dotenv';
import { initGemini } from './controllers/resume.controller.js';
import connectDB from './db/db.js';
import { userRouter } from './route/user.route.js';
import resumeRoutes from './route/resume.route.js';

// Load environment variables first
dotenv.config({ path: './.env' });

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    // Database connection
    await connectDB();
    console.log('✅ Database connected');

    // AI service initialization
    initGemini();
    console.log('✅ Gemini AI initialized');

    // Routes
    app.use('/user', userRouter);
    app.use('/resume', resumeRoutes);
    app.use("/jobs", jobRoutes);


    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error('Server error:', err);
      res.status(500).json({ 
        error: 'Internal server error',
        message: err.message 
      });
    });

    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔗 http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Failed to initialize services:', error);
    process.exit(1);
  }
})();