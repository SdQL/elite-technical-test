import { useState } from "react";
import type { CreateUserRequest, User } from "../types";
import { createUser, getErrorMessage } from "../services/userService";

export const useCreateUser = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const create = async (userData: CreateUserRequest): Promise<User | null> => {
        try {
            setLoading(true);
            setError(null);

            const newUser = await createUser(userData);
            return newUser;


        } catch (error) {
            setError(getErrorMessage(error));
            return null;
        } finally {
            setLoading(false);
        }
    }

    return {
        create,
        loading,
        error,
        clearError: () => setError(null)
    }
}