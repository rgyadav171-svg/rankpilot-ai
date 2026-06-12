import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = { title: 'RankPilot AI', description: 'SEO Website Auditor' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900">{children}</body>
    </html>
  );
}