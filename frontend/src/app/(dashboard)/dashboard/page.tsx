'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [audits, setAudits] = useState([]);
  useEffect(() => {
    if (user) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/audits`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        .then(res => setAudits(res.data.audits));
    }
  }, [user]);
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name || user?.email}</h1>
      <div className="bg-white p-4 rounded shadow">
        <p>Credits used: {user?.creditsUsed} / {user?.creditsLimit}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Recent Audits</h2>
        {audits.length === 0 && <p>No audits yet. Start a new audit.</p>}
        {audits.map((audit: any) => (
          <Link key={audit.id} href={`/dashboard/audits/${audit.id}`} className="block border p-3 my-2 rounded hover:bg-gray-50">
            <p className="font-medium">{audit.websiteUrl}</p>
            <p className="text-sm text-gray-500">Status: {audit.status} | Score: {audit.score ?? 'N/A'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}