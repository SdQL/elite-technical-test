// hooks/useUsersData.ts - Consolidado: data + CRUD operations
import { useState, useEffect, useCallback } from 'react';
import type { User, CreateUserRequest, UpdateUserRequest, UsersResponse } from '../types';
import { getUsers, createUser, updateUser, deleteUser, getErrorMessage } from '../services/userService';

export const useUsers = (page: number = 1, limit: number = 8, onPageChange?: (page: number) => void) => {
  // Estado de la lista
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<UsersResponse['pagination'] | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Estado de operaciones CRUD
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Fetch lista de usuarios
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUsers(page, limit);
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (err) {
      setError(getErrorMessage(err));
      setUsers([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  // Crear usuario
  const create = async (userData: CreateUserRequest): Promise<boolean> => {
    try {
      setActionLoading(true);
      setActionError(null);
      
      await createUser(userData);
      
      // Refrescar la lista para mostrar el nuevo usuario
      await fetchUsers();
      
      return true;
    } catch (err) {
      setActionError(getErrorMessage(err));
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  // Actualizar usuario
  const update = async (id: string, userData: UpdateUserRequest): Promise<boolean> => {
    try {
      setActionLoading(true);
      setActionError(null);
      
      await updateUser(id, userData);
      
      // Actualizar en la lista local
      setUsers(prev => prev.map(user => 
        user.id === id ? { ...user, ...userData } : user
      ));
      
      return true;
    } catch (err) {
      setActionError(getErrorMessage(err));
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  // Eliminar usuario
  const remove = async (id: string): Promise<boolean> => {
    try {
      setActionLoading(true);
      setError(null);
      
      await deleteUser(id);
      
      // Verificar si necesitamos cambiar de página ANTES de actualizar el estado
      const willBeEmpty = users.length === 1;
      const shouldGoToPrevious = willBeEmpty && page > 1;
      
      // Remover de la lista local
      setUsers(prev => prev.filter(user => user.id !== id));
      
      // Si la página actual queda vacía, ir a la anterior
      if (shouldGoToPrevious && onPageChange) {
        onPageChange(page - 1);
      }
      
      return true;
    } catch (err) {
      setError(getErrorMessage(err));
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const clearError = () => setError(null);
  const clearActionError = () => setActionError(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    // Estado
    users,
    pagination,
    loading,
    actionLoading,
    error,
    actionError,
    
    // Operaciones
    create,
    update,
    remove,
    refetch: fetchUsers,
    clearError,
    clearActionError
  };
};