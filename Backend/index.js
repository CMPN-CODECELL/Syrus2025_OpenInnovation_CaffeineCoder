import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import { initGemini } from './controllers/resume.controller.js';
import { userRouter } from './route/user.route.js';
import resumeRoutes from './route/resume.route.js';
import skillSwapRouter from './route/skillswap.route.js';

// Load environment variables
dotenv.config({ path: './.env' });

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    await connectDB(); // Connect to MongoDB
    console.log('✅ Database connected');

    initGemini(); // Initialize Gemini AI
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
