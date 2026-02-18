import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { wsManager } from '../websocket.js';

interface AuthUser {
    id: string;
}

interface AuthRequest extends Request {
    user: AuthUser;
}

export const sendMoney = async (req: Request, res: Response) => {
    const authReq = req as AuthRequest;
    const { recipientEmail, amount } = authReq.body;
    const senderId = authReq.user.id;

    if (amount <= 0) {
        return res.status(400).json({ message: 'Amount must be greater than 0' });
    }

    try {
        const result = await prisma.$transaction(async (tx) => {
            const sender = await tx.user.findUnique({ where: { id: senderId } });
            if (!sender) throw new Error('Sender not found');
            if (Number(sender.balance) < amount) throw new Error('Insufficient balance');

            const recipient = await tx.user.findUnique({ where: { email: recipientEmail } });
            if (!recipient) throw new Error('Recipient not found');
            if (recipient.id === senderId) throw new Error('Cannot send money to self');

            await tx.user.update({
                where: { id: senderId },
                data: { balance: { decrement: amount } },
            });

            await tx.user.update({
                where: { id: recipient.id },
                data: { balance: { increment: amount } },
            });

            const transaction = await tx.transaction.create({
                data: {
                    senderId,
                    receiverId: recipient.id,
                    amount,
                    status: 'COMPLETED',
                },
            });

            return { transaction, sender, recipient };
        });

        const transactionData = {
            id: result.transaction.id,
            amount: String(result.transaction.amount),
            type: 'sent',
            otherParty: result.recipient.name,
            timestamp: result.transaction.createdAt,
        };

        wsManager.notifyTransaction(senderId, transactionData);
        wsManager.notifyTransaction(result.recipient.id, {
            ...transactionData,
            type: 'received',
            otherParty: result.sender.name,
        });

        const senderBalance = Number(result.sender.balance) - Number(amount);
        const recipientBalance = Number(result.recipient.balance) + Number(amount);
        wsManager.notifyBalanceUpdate(senderId, senderBalance);
        wsManager.notifyBalanceUpdate(result.recipient.id, recipientBalance);

        res.json({ message: 'Transaction successful', transaction: result.transaction });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message || 'Transaction failed' });
        }
        res.status(400).json({ message: 'Transaction failed' });
    }
};

export const getHistory = async (req: Request, res: Response) => {
    const authReq = req as AuthRequest;
    const userId = authReq.user.id;

    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                OR: [
                    { senderId: userId },
                    { receiverId: userId },
                ],
            },
            include: {
                sender: { select: { name: true, email: true } },
                receiver: { select: { name: true, email: true } },
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(transactions);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

const mockRecurring = [
    { id: '1', name: 'Netflix', amount: 499, frequency: 'monthly', nextDate: '2026-03-01', status: 'active' },
    { id: '2', name: 'Spotify', amount: 199, frequency: 'monthly', nextDate: '2026-03-05', status: 'active' },
    { id: '3', name: 'Electricity', amount: 1500, frequency: 'monthly', nextDate: '2026-03-15', status: 'active' },
];

export const getRecurring = async (req: Request, res: Response) => {
    res.json(mockRecurring);
};

export const createRecurring = async (req: Request, res: Response) => {
    const { name, amount, frequency, recipientEmail } = req.body;
    const newRecurring = {
        id: String(mockRecurring.length + 1),
        name,
        amount,
        frequency,
        nextDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'active'
    };
    mockRecurring.push(newRecurring);
    res.json(newRecurring);
};

const mockSplits = [
    { id: '1', groupName: 'Office Lunch', totalAmount: 2500, date: '2026-02-15', participants: 5, myShare: 500, status: 'settled' },
    { id: '2', groupName: 'Weekend Trip', totalAmount: 15000, date: '2026-02-10', participants: 4, myShare: 3750, status: 'pending' },
    { id: '3', groupName: 'Grocery', totalAmount: 1200, date: '2026-02-08', participants: 3, myShare: 400, status: 'settled' },
];

export const splitBill = async (req: Request, res: Response) => {
    const { groupName, totalAmount, participants, participantEmails } = req.body;
    const newSplit = {
        id: String(mockSplits.length + 1),
        groupName,
        totalAmount,
        date: new Date().toISOString().split('T')[0],
        participants: participants || 2,
        myShare: totalAmount / (participants || 2),
        status: 'pending'
    };
    mockSplits.push(newSplit);
    res.json(newSplit);
};

export const getSplits = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (id) {
        const split = mockSplits.find(s => s.id === id);
        return res.json(split || null);
    }
    res.json(mockSplits);
};
