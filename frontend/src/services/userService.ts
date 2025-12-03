import axios from "axios";
import type { User, CreateUserRequest,  UpdateUserRequest, ApiResponse, UsersResponse, DeleteUserResponse } from "../types"


const api = axios.create({
    baseURL: 'https://elite-technical-test.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    }
})

export const getErrorMessage = (error: unknown): string => {
    if(axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
 
        switch(status) {
            case 404: return 'Usuario no encontrado';
            case 409: return 'Este email ya está registrado'
            case 400: return 'Datos inválidos, por favor verifique e intente nuevamente';
            case 500: return 'Error del servidor, por favor intente más tarde';
            default: return 'Ocurrió un error inesperado';
        }
    }

    return 'Error de red, por favor verifique su conexión a internet';
}
 

export const getUsers = async (page: number = 1, limit: number = 10) => {
    const response = await api.get<ApiResponse<UsersResponse>>(`/users?page=${page}&limit=${limit}`);
    return response.data.data;
}

export const getUserById = async (id: string): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data;
}
    

export const createUser = async (userData: CreateUserRequest): Promise<User> => {
    const response = await api.post<ApiResponse<User>>('/users', userData);
    return response.data.data;
}
     

export const updateUser = async (id: string, userData: UpdateUserRequest): Promise<User> => {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, userData);
    return response.data.data;
}


export const deleteUser = async (id: string) => {
    const response = await api.delete<ApiResponse<DeleteUserResponse>>(`/users/${id}`);
    return response.data.data;
}