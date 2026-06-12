import { Queue } from 'bullmq';
import Redis from 'ioredis';

const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export const auditQueue = new Queue('audit-queue', { connection });

export const addAuditToQueue = async (auditId: string, websiteUrl: string, userId: string) => {
  // In serverless, you'd need an external worker. For now, just log.
  console.log(`Job queued: ${auditId} ${websiteUrl}`);
  return { id: 'mock-job-id' };
};