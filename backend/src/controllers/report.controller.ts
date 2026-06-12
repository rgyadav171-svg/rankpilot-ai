import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';
import { PdfReportService } from '../services/pdf-report.service';

const prisma = new PrismaClient();

export const generatePdfReport = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const audit = await prisma.audit.findFirst({ where: { id, userId: req.user!.userId } });
  if (!audit) return res.status(404).json({ error: 'Audit not found' });
  const service = new PdfReportService(id);
  const pdfBuffer = await service.generateReport();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="audit-${id}.pdf"`);
  res.send(pdfBuffer);
};