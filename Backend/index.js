import express from 'express';
import connectDB from './db/db.js';
import dotenv from 'dotenv';
import { userRouter } from './route/user.route.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
try {
    connectDB();
    app.use('/user',userRouter);
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}
