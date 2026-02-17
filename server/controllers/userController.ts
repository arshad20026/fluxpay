import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';

interface AuthUser {
    id: string;
}

interface AuthRequest extends Request {
    user: AuthUser;
}

const mockCards = [
    { id: '1', last4: '4829', type: 'virtual', status: 'active', limit: 50000, used: 12450 },
    { id: '2', last4: '7291', type: 'virtual', status: 'active', limit: 25000, used: 0 },
    { id: '3', last4: '1043', type: 'physical', status: 'active', limit: 100000, used: 45230 },
];

const mockCrypto = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', balance: 0.025, price: 4250000, change24h: 2.4 },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', balance: 0.5, price: 285000, change24h: 3.1 },
    { id: 'sol', name: 'Solana', symbol: 'SOL', balance: 5, price: 12500, change24h: -1.2 },
];

const mockRewards = [
    { id: '1', title: 'Welcome Bonus', points: 500, date: '2026-02-01', status: 'credited' },
    { id: '2', title: 'First Transaction', points: 100, date: '2026-02-02', status: 'credited' },
    { id: '3', title: 'Referral Bonus', points: 250, date: '2026-02-05', status: 'credited' },
    { id: '4', title: 'Weekly Spend', points: 150, date: '2026-02-10', status: 'pending' },
];

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

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest;
    const { name, email } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id: authReq.user.id },
            data: { name, email },
            select: { id: true, name: true, email: true, balance: true }
        });
        res.json(user);
    } catch (error: unknown) {
        next(error);
    }
};

export const addFunds = async (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest;
    const { amount } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id: authReq.user.id },
            data: {
                balance: { increment: parseFloat(amount) }
            }
        });
        res.json({ balance: user.balance, message: 'Funds added successfully' });
    } catch (error: unknown) {
        next(error);
    }
};

export const getCards = async (req: Request, res: Response) => {
    res.json(mockCards);
};

export const createCard = async (req: Request, res: Response) => {
    const { type, limit } = req.body;
    const newCard = {
        id: String(mockCards.length + 1),
        last4: String(Math.floor(1000 + Math.random() * 9000)),
        type: type || 'virtual',
        status: 'active',
        limit: limit || 25000,
        used: 0
    };
    mockCards.push(newCard);
    res.json(newCard);
};

export const getRewards = async (req: Request, res: Response) => {
    const totalPoints = mockRewards.reduce((acc, r) => acc + r.points, 0);
    res.json({ rewards: mockRewards, totalPoints, availablePoints: totalPoints - 500 });
};

export const getCrypto = async (req: Request, res: Response) => {
    res.json(mockCrypto);
};

export const getAnalytics = async (req: Request, res: Response) => {
    const authReq = req as AuthRequest;
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                OR: [
                    { senderId: authReq.user.id },
                    { receiverId: authReq.user.id }
                ]
            },
            orderBy: { createdAt: 'desc' },
            take: 30
        });

        const sent = transactions.filter(t => t.senderId === authReq.user.id);
        const received = transactions.filter(t => t.receiverId === authReq.user.id);

        const totalSent = sent.reduce((acc, t) => acc + t.amount, 0);
        const totalReceived = received.reduce((acc, t) => acc + t.amount, 0);

        const spendingByCategory = [
            { category: 'Shopping', amount: totalSent * 0.4 },
            { category: 'Food', amount: totalSent * 0.25 },
            { category: 'Transport', amount: totalSent * 0.15 },
            { category: 'Bills', amount: totalSent * 0.2 }
        ];

        res.json({
            totalSent,
            totalReceived,
            transactionCount: transactions.length,
            averageTransaction: transactions.length > 0 ? totalSent / sent.length : 0,
            spendingByCategory
        });
    } catch (error: unknown) {
        res.json({
            totalSent: 45230,
            totalReceived: 28500,
            transactionCount: 47,
            averageTransaction: 2100,
            spendingByCategory: [
                { category: 'Shopping', amount: 18092 },
                { category: 'Food', amount: 11307 },
                { category: 'Transport', amount: 6784 },
                { category: 'Bills', amount: 9046 }
            ]
        });
    }
};
