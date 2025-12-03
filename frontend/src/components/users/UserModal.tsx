import { Modal } from "../ui/Modal";
import { UserForm } from "./UserForm";
import type { User, CreateUserRequest } from "../../types";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User; // undefined = crear, User = editar
  onCreateUser: (data: CreateUserRequest) => Promise<boolean>;
  onUpdateUser: (id: string, data: CreateUserRequest) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const UserModal = ({
  isOpen,
  onClose,
  user,
  onCreateUser,
  onUpdateUser,
  loading,
  error,
}: UserModalProps) => {
  const isEditing = !!user;

  const handleSubmit = async (data: CreateUserRequest) => {
    let success = false;

    if (isEditing) {
      success = await onUpdateUser(user.id, data);
    } else {
      success = await onCreateUser(data);
    }

    return success;
  };

  // Título dinámico
  const title = isEditing ? "Editar Usuario" : "Crear Usuario";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <UserForm
        user={user}
        onSubmit={handleSubmit}
        loading={loading}
        error={error || undefined}
      />
    </Modal>
  );
};
