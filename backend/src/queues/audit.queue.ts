// Mock queue for Vercel serverless (no Redis required)
export const addAuditToQueue = async (auditId: string, websiteUrl: string, userId: string) => {
  console.log(`[Mock Queue] Job received: ${auditId} for ${websiteUrl}`);
  // In serverless, you'd need a separate worker or external queue service
  return { id: 'mock-job-id' };
};