import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string; email: string; name?: string; plan: string; creditsUsed: number; creditsLimit: number;
}
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) fetchUser(token);
    else setLoading(false);
  }, []);
  const fetchUser = async (token: string) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
      setUser(res.data.user);
    } catch { localStorage.removeItem('token'); } finally { setLoading(false); }
  };
  const login = async (email: string, password: string) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    return res.data;
  };
  const logout = () => { localStorage.removeItem('token'); setUser(null); };
  return { user, loading, login, logout };
};