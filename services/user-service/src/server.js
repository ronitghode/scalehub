import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5002;

// Connect to Database and start server
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`User Service running on port ${PORT}`);
    });
};

startServer();
