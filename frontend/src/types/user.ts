export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    company: string;
    location: string;
    bio?: string;
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserRequest {
    name: string;
    email: string;
    role: string;
    company: string;
    location: string;
    bio?: string;
    avatarUrl?: string;
}

export type UpdateUserRequest = CreateUserRequest

export interface DeleteUserResponse {
    message: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export interface ApiError {
    success: false;
    error: string;
    details?: Array<{
        field: string;
        message: string
    }> | null;
}

export interface UsersResponse {
    users: User[];
    pagination: Pagination;
}
