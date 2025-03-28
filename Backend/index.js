import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/db.js';
import { initGemini } from './controllers/resume.controller.js';
import { userRouter } from './route/user.route.js';
import resumeRoutes from './route/resume.route.js';
import skillSwapRouter from './route/skillswap.route.js';
import mentorshipRouter from './route/mentorship.route.js';

// Load environment variables
dotenv.config({ path: './.env' });



// Validate required environment variables
const requiredEnvVars = ['GEMINI_API_KEY', 'MONGO_URI'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars);
  process.exit(1);
}

console.log('✅ Environment variables loaded');

// Initialize Express
const app = express();


app.use(cors({
  origin: 'http://localhost:5173', // Match your React app's port (5173)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    services: {
      database: 'connected', // This should be dynamically checked in production
      gemini: 'initialized'
    }
  });
});

// Routes
app.use('/user', userRouter);
app.use('/resume', resumeRoutes);
app.use('/skillswap', skillSwapRouter);
app.use('/mentorship', mentorshipRouter);

// Basic Route
app.get('/', (req, res) => {
  res.send(`
    <h1>Resume Generator API</h1>
    <p>Endpoints available:</p>
    <ul>
      <li>POST /resume/generate-resume-section</li>
      <li>POST /resume/evaluate-resume</li>
      <li>User routes at /user</li>
    </ul>
  `);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Start Server after initializing services
(async () => {
  try {
    await connectDB(); // Connect to MongoDB
    console.log('✅ Database connected');

    initGemini(); // Initialize Gemini AI
    console.log('✅ Gemini AI initialized');

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
