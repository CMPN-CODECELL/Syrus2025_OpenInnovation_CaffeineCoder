import express from 'express';
import connectDB from './db/db.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
try {
    connectDB();
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
