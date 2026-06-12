'use client';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  useEffect(() => { if (!loading && !user) router.push('/login'); }, [loading, user]);
  if (loading) return <div>Loading...</div>;
  if (!user) return null;
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">RankPilot AI</h2>
        <nav className="space-y-2">
          <Link href="/dashboard" className="block p-2 hover:bg-gray-100 rounded">Dashboard</Link>
          <Link href="/dashboard/audits" className="block p-2 hover:bg-gray-100 rounded">Audits</Link>
          <button onClick={logout} className="block w-full text-left p-2 text-red-600">Logout</button>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}