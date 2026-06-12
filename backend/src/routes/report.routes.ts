import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { generatePdfReport } from '../controllers/report.controller';

const router = Router();
router.use(authenticate);
router.post('/:id/report', generatePdfReport);
export default router;