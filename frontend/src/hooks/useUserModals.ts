import { useState } from 'react';
import type { User } from '../types';

export const useUserModals = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  return {
    // Create modal
    isCreateOpen,
    openCreate: () => setIsCreateOpen(true),
    closeCreate: () => setIsCreateOpen(false),

    // Edit modal
    editingUser,
    isEditOpen: !!editingUser,
    openEdit: (user: User) => setEditingUser(user),
    closeEdit: () => setEditingUser(null),

    // Delete modal
    deletingUser,
    isDeleteOpen: !!deletingUser,
    openDelete: (user: User) => setDeletingUser(user),
    closeDelete: () => setDeletingUser(null),

    // Cerrar todos
    closeAll: () => {
      setIsCreateOpen(false);
      setEditingUser(null);
      setDeletingUser(null);
    }
  };
};