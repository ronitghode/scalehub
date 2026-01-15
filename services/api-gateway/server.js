import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'API Gateway is running' });
});

// Proxy Config
const authServiceProxy = createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL || 'http://auth-service:5000',
    changeOrigin: true,
    pathRewrite: {
        '^/api/auth': '/', // Strip prefix
    },
});

const userServiceProxy = createProxyMiddleware({
    target: process.env.USER_SERVICE_URL || 'http://user-service:5002',
    changeOrigin: true,
    pathRewrite: {
        '^/api/users': '/', // Strip prefix
    },
});

const communicationServiceProxy = createProxyMiddleware({
    target: process.env.COMMUNICATION_SERVICE_URL || 'http://communication-service:5003',
    changeOrigin: true,
    ws: true, // Enable WebSocket support
    // No path rewrite needed if we mount at /socket.io in gateway and service expects /socket.io
});

// Routes
app.use('/api/auth', authServiceProxy);
app.use('/api/users', userServiceProxy);
app.use('/socket.io', communicationServiceProxy); // Forward socket.io handshake requests

// Start Server
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
