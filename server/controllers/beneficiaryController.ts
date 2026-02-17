import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}

export const getBeneficiaries = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const beneficiaries = await prisma.beneficiary.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
        res.json(beneficiaries);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
};

export const addBeneficiary = async (req: AuthRequest, res: Response) => {
    try {
        const { name, email, upiId } = req.body;
        const userId = req.user?.id;

        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        const beneficiary = await prisma.beneficiary.create({
            data: {
                name,
                email,
                upiId,
                userId: userId as string
            }
        });

        res.status(201).json(beneficiary);
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'P2002') {
            return res.status(400).json({ message: 'Beneficiary with this email already exists' });
        }
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
};

export const updateBeneficiary = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, upiId } = req.body;
        const userId = req.user?.id;

        const existing = await prisma.beneficiary.findFirst({
            where: { id: id as string, userId: userId as string }
        });

        if (!existing) {
            return res.status(404).json({ message: 'Beneficiary not found' });
        }

        const updated = await prisma.beneficiary.update({
            where: { id: id as string },
            data: { name, email, upiId }
        });

        res.json(updated);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
};

export const deleteBeneficiary = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        const existing = await prisma.beneficiary.findFirst({
            where: { id: id as string, userId: userId as string }
        });

        if (!existing) {
            return res.status(404).json({ message: 'Beneficiary not found' });
        }

        await prisma.beneficiary.delete({
            where: { id: id as string }
        });

        res.json({ message: 'Beneficiary deleted successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
};
