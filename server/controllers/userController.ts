import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';

interface AuthUser {
    id: string;
}

interface AuthRequest extends Request {
    user: AuthUser;
}

export const getBalance = async (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest;
    try {
        const user = await prisma.user.findUnique({
            where: { id: authReq.user.id }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ balance: user.balance });
    } catch (error: unknown) {
        next(error);
    }
};

export const searchUsers = async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.query;
    if (!query) return res.json([]);
    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { email: { contains: query as string } },
                    { name: { contains: query as string } }
                ]
            },
            select: {
                id: true,
                name: true,
                email: true
            },
            take: 5
        });
        res.json(users);
    } catch (error: unknown) {
        next(error);
    }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest;
    try {
        const user = await prisma.user.findUnique({
            where: { id: authReq.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                balance: true,
                createdAt: true
            }
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error: unknown) {
        next(error);
    }
};
