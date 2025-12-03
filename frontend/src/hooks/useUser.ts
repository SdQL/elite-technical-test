// hooks/useUserDetail.ts
import { useState, useEffect } from 'react';
import { getUserById } from '../services/userService';
import type { User } from '../types';

export const useUser = (id: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const userData = await getUserById(id);
        setUser(userData);
      } catch (err) {
        setError('Error al cargar el usuario');
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  return { user, loading, error };
};