import { useState } from 'react';
import type { UpdateUserRequest } from '../types';
import { updateUser, getErrorMessage } from '../services/userService';

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: string, userData: UpdateUserRequest): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      await updateUser(id, userData);
      return true;
      
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    update,
    loading,
    error,
    clearError: () => setError(null)
  };
};