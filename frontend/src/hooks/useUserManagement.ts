import { useState } from 'react';
import type { User, CreateUserRequest } from '../types';
import { useModal } from './useModal';
import { useUsers } from './useUsers';
import { useUrlParams } from './useUrlParams';
import { useCreateUser } from './useCreateUser';
import { useUpdateUser } from './useUpdateUser';
import { useDeleteUser } from './useDeleteUser';

export const useUserManagement = () => {
  // Hooks de estado
  const { currentPage, setCurrentPage } = useUrlParams();
  const createModal = useModal();
  const editModal = useModal();
  const confirmDeleteModal = useModal();
  const { users, pagination, loading, error, refetch } = useUsers(currentPage);

  // Hooks CRUD
  const { create, loading: creating, error: createError, clearError: clearCreateError } = useCreateUser();
  const { update, loading: updating, error: updateError, clearError: clearUpdateError } = useUpdateUser();
  const { remove, loading: deleting, error: deleteError } = useDeleteUser();

  // Estado para el usuario que se está editando/eliminando
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Estados combinados
  const isLoading = creating || updating || deleting;
  const operationError = createError || updateError || deleteError;

  // Handlers para acciones de usuario
  const handleUserCreated = async (data: CreateUserRequest) => {
    const newUser = await create(data);
    if (newUser) {
      refetch();
      createModal.close();
      return true;
    }
    return false;
  };

  const handleUserUpdated = async (id: string, data: CreateUserRequest) => {
    const success = await update(id, data);
    if (success) {
      refetch();
      editModal.close();
      setEditingUser(null);
      return true;
    }
    return false;
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    editModal.open();
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    confirmDeleteModal.open();
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    
    const success = await remove(userToDelete.id);
    if (success) {
      refetch();
      confirmDeleteModal.close();
      setUserToDelete(null);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateUser = () => {
    createModal.open();
  };

  const handleCloseCreateModal = () => {
    clearCreateError();
    createModal.close();
  };

  const handleCloseEditModal = () => {
    clearUpdateError();
    editModal.close();
    setEditingUser(null);
  };

  const handleCloseDeleteModal = () => {
    confirmDeleteModal.close();
    setUserToDelete(null);
  };

  return {
    // Estados
    users: users || [],
    pagination,
    loading,
    error,
    currentPage,
    editingUser,
    userToDelete,
    
    // Estados de operaciones CRUD
    isLoading,
    operationError,
    
    // Estados de modales
    createModal: {
      isOpen: createModal.isOpen,
      open: handleCreateUser,
      close: handleCloseCreateModal,
    },
    editModal: {
      isOpen: editModal.isOpen,
      open: editModal.open,
      close: handleCloseEditModal,
    },
    confirmDeleteModal: {
      isOpen: confirmDeleteModal.isOpen,
      open: confirmDeleteModal.open,
      close: handleCloseDeleteModal,
    },
    
    // Handlers CRUD
    onCreateUser: handleUserCreated,
    onUpdateUser: handleUserUpdated,
    onEditUser: handleEditUser,
    onDeleteUser: handleDeleteUser,
    onConfirmDelete: handleConfirmDelete,
    onPageChange: handlePageChange,
  };
};