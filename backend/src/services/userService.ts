import { User } from '../models/index.js';

interface CreateUserData {
    name: string;
    email: string;
    avatarUrl?: string;
}

interface CustomError extends Error {
    statusCode?: number;
}

export class UserService {
    static async createUser(userData: CreateUserData) {
        try {
            const user = await User.create({
                name: userData.name,
                email: userData.email,
                avatarUrl: userData.avatarUrl,
            });

            return user;
        } catch (error) {
            throw error;
        }
    }

    static async getAllUsers(page: number, limit: number) {
        try {
            const offset = (page - 1) * limit;

            const { count, rows } = await User.findAndCountAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']],
            })

            const totalPages = Math.ceil(count / limit);

            if (page > totalPages && totalPages > 0) {
                const error = new Error(`Page ${page} not found. Max page is ${totalPages}`) as CustomError;
                error.statusCode = 404;
                throw error;
            }

            return {
                users: rows,
                pagination: {
                    page,
                    limit,
                    total: count,
                    totalPages,
                    hasNext: page < totalPages,
                    hasPrev: page > 1,
                }
            }

        } catch (error) {
            throw error;
        }
    }

    static async getUserById(id: string) {
        try {
            const user = await User.findByPk(id);

            if (!user) {
                const error = new Error('User not found') as CustomError;
                error.statusCode = 404
                throw error;
            }

            return user;
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(id: string, updateData: Partial<CreateUserData>) {
        try {
            const user = await User.findByPk(id);

            if (!user) {
                const error = new Error('User not found') as CustomError;
                error.statusCode = 404
                throw error;
            }

            await user.update(updateData);
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(id: string) {
        try {
            const user = await User.findByPk(id);

            if (!user) {
                const error = new Error('User not found') as CustomError;
                error.statusCode = 404
                throw error;
            }

            await user.destroy();
            return { message: 'User deleted successfully' };
        } catch (error) {
            throw error;
        }
    }
}