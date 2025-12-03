import { AlertTriangle } from "lucide-react";
import { Modal } from "../ui/Modal";
import type { User } from "../../types";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onConfirm: () => Promise<void>;
  loading: boolean;
}

export const ConfirmDeleteModal = ({ 
  isOpen, 
  onClose, 
  user, 
  onConfirm, 
  loading 
}: ConfirmDeleteModalProps) => {
  if (!user) return null;

  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Confirmar eliminación"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>

        <div className="text-center space-y-2">
          <p className="text-gray-900 font-medium">
            ¿Estás seguro que quieres eliminar este usuario?
          </p>
          <p className="text-sm text-gray-500">
            Se eliminará permanentemente a <span className="font-medium">{user.name}</span> ({user.email})
          </p>
          <p className="text-sm text-red-600">
            Esta acción no se puede deshacer.
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2 text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            {loading ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </Modal>
  );
};