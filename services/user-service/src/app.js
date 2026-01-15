import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'User Service is running' });
});

import userRoutes from './routes/userRoutes.js';

// Routes
// Note: We mount at '/' because Gateway strips prefix, but we can also organize it.
// The Gateway forwards /api/users/* -> /. So /api/users/profile becomes /profile here.
app.use('/', userRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

export default app;
