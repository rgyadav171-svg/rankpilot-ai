import puppeteer from 'puppeteer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PdfReportService {
  constructor(private auditId: string) {}

  async generateReport(): Promise<Buffer> {
    const audit = await prisma.audit.findUnique({
      where: { id: this.auditId },
      include: { pages: true, issues: true, recommendations: true },
    });
    if (!audit) throw new Error('Audit not found');
    const html = this.buildHtml(audit);
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();
    return pdf;
  }

  private buildHtml(audit: any): string {
    return `<!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><title>RankPilot SEO Report</title><style>body{font-family:sans-serif;padding:40px}</style></head>
    <body><h1>SEO Audit Report</h1><p>URL: ${audit.websiteUrl}</p><p>Score: ${audit.score ?? 'N/A'}</p><h2>Issues</h2>${audit.issues.map((i: any) => `<div><b>${i.title}</b><p>${i.description}</p></div>`).join('')}
    <h2>Recommendations</h2>${audit.recommendations.map((r: any) => `<div><b>${r.title}</b><p>${r.description}</p></div>`).join('')}
    </body></html>`;
  }
}