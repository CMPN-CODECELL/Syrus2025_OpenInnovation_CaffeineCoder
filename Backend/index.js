import express from 'express';
import connectDB from './db/db.js';
import dotenv from 'dotenv';
import { userRouter } from './route/user.route.js';
import resumeRoutes from './route/resume.route.js';

// Config
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/user',userRouter);
app.use('/resume', resumeRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});
    
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

