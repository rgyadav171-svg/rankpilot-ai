import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';
import { addAuditToQueue } from '../queues/audit.queue';

const prisma = new PrismaClient();

export const createAudit = async (req: AuthRequest, res: Response) => {
  const { websiteUrl } = req.body;
  if (!websiteUrl) return res.status(400).json({ error: 'URL required' });
  const userId = req.user!.userId;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.creditsUsed >= user.creditsLimit) return res.status(403).json({ error: 'Credit limit exceeded' });
  const audit = await prisma.audit.create({ data: { websiteUrl, userId } });
  await prisma.user.update({ where: { id: userId }, data: { creditsUsed: { increment: 1 } } });
  await addAuditToQueue(audit.id, websiteUrl, userId);
  res.status(201).json({ auditId: audit.id });
};

export const getAudits = async (req: AuthRequest, res: Response) => {
  const audits = await prisma.audit.findMany({ where: { userId: req.user!.userId }, orderBy: { createdAt: 'desc' } });
  res.json({ audits });
};

export const getAuditById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const audit = await prisma.audit.findFirst({ where: { id, userId: req.user!.userId }, include: { pages: true, issues: true, recommendations: true } });
  if (!audit) return res.status(404).json({ error: 'Not found' });
  res.json(audit);
};