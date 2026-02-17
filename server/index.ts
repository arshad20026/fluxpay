import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import transactionRoutes from './routes/transaction.js';
import beneficiaryRoutes from './routes/beneficiary.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/beneficiary', beneficiaryRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('FluxPay API is running');
});

// Global Error Handler
interface AppError {
    status?: number;
    message?: string;
}

app.use((err: AppError, _req: Request, res: Response, _next: () => void) => {
    console.error('SERVER ERROR:', err);
    res.status(err.status || 500).json({
        message: err.message || 'An internal server error occurred',
        error: process.env.NODE_ENV === 'development' ? err : undefined
    });
});

app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
