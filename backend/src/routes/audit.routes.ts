import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { createAudit, getAudits, getAuditById } from '../controllers/audit.controller';

const router = Router();
router.use(authenticate);
router.post('/', createAudit);
router.get('/', getAudits);
router.get('/:id', getAuditById);
export default router;