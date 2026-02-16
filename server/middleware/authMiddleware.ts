import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthUserPayload {
    id: string;
    iat?: number;
    exp?: number;
}

interface AuthRequest extends Request {
    user?: AuthUserPayload;
}

const JWT_SECRET = process.env.JWT_SECRET || 'development-only-secret';

export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as AuthUserPayload;
        req.user = decoded;
        next();
    } catch {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
