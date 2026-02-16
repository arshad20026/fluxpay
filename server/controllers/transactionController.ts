import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

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
            // 1. Check sender balance
            const sender = await tx.user.findUnique({ where: { id: senderId } });
            if (!sender) throw new Error('Sender not found');
            if (Number(sender.balance) < amount) throw new Error('Insufficient balance');

            // 2. Check recipient exists
            const recipient = await tx.user.findUnique({ where: { email: recipientEmail } });
            if (!recipient) throw new Error('Recipient not found');
            if (recipient.id === senderId) throw new Error('Cannot send money to self');

            // 3. Deduct from sender
            await tx.user.update({
                where: { id: senderId },
                data: { balance: { decrement: amount } },
            });

            // 4. Add to recipient
            await tx.user.update({
                where: { id: recipient.id },
                data: { balance: { increment: amount } },
            });

            // 5. Record transaction
            const transaction = await tx.transaction.create({
                data: {
                    senderId,
                    receiverId: recipient.id,
                    amount,
                    status: 'COMPLETED',
                },
            });

            return transaction;
        });

        res.json({ message: 'Transaction successful', transaction: result });
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
