'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';

export default function AuditDetailPage() {
  const { id } = useParams();
  const [audit, setAudit] = useState<any>(null);
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/audits/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        .then(res => setAudit(res.data));
    }
  }, [id, user]);
  if (!audit) return <div>Loading...</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold">{audit.websiteUrl}</h1>
      <p>Status: {audit.status} | Score: {audit.score ?? 'N/A'}</p>
      <h2 className="text-xl mt-4">Issues</h2>
      {audit.issues.map((issue: any) => (
        <div key={issue.id} className="border p-2 my-2"><b>{issue.title}</b><p>{issue.description}</p></div>
      ))}
    </div>
  );
}