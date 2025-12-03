import { useState, useEffect, useCallback } from "react"
import type { User, UsersResponse } from '../types/user';
import { getUsers, getErrorMessage } from "../services/userService";

export const useUsers = (page: number = 1, limit: number = 8) => {
    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState<UsersResponse['pagination'] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getUsers(page, limit);
            setUsers(data.users);
            setPagination(data.pagination);

        } catch (error) {
            setError(getErrorMessage(error))
            setUsers([])
            setPagination(null);
        } finally {
            setLoading(false);
        }
    }, [page, limit]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const refetch = useCallback(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        pagination,
        loading,
        error,
        refetch
    }
}