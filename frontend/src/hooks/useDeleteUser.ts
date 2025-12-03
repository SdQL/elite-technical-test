import { useState } from 'react';
import { deleteUser, getErrorMessage } from '../services/userService';

export const useDeleteUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const remove = async (id: string): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);

            await deleteUser(id);
            return true;

        } catch (err) {
            setError(getErrorMessage(err));
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        remove,
        loading,
        error,
        clearError: () => setError(null)
    };
};