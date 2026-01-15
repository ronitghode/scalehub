import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import socketHandler from './socket.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Socket.io Setup
const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins for now, or restrict to process.env.CLIENT_URL
        methods: ['GET', 'POST']
    },
    path: '/socket.io' // Explicitly set path
});

// Initialize Socket Logic
socketHandler(io);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Communication Service is running' });
});

const PORT = process.env.PORT || 5003;

server.listen(PORT, () => {
    console.log(`Communication Service running on port ${PORT}`);
});
