import { useState } from 'react';
import { useModal } from './useModal';
import type { User } from '../types';

export const useUserModals = (clearErrors?: () => void) => {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const createModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();

  return {
    editingUser,
    userToDelete,
    createModal: {
      ...createModal,
      close: () => {
        clearErrors?.();
        createModal.close();
      }
    },
    editModal: {
      ...editModal,
      open: (user: User) => {
        setEditingUser(user);
        editModal.open();
      },
      close: () => {
        setEditingUser(null);
        editModal.close();
      }
    },
    
    deleteModal: {
      ...deleteModal,
      open: (user: User) => {
        setUserToDelete(user);
        deleteModal.open();
      },
      close: () => {
        setUserToDelete(null);
        deleteModal.close();
      }
    }
  };
};