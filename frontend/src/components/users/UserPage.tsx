import { Plus } from "lucide-react";
import { UserModal } from "./UserModal";
import { UserList } from "./UserList";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { Pagination } from "../ui";
import { useUserManagement } from "../../hooks/useUserManagement";

export const UserPage = () => {
  const {
    users,
    pagination,
    loading,
    error,
    createModal,
    editModal,
    confirmDeleteModal,
    editingUser,
    userToDelete,
    isLoading,
    operationError,
    onCreateUser,
    onUpdateUser,
    onEditUser,
    onDeleteUser,
    onConfirmDelete,
    onPageChange,
  } = useUserManagement();

  return (
    <div className="space-y-6">
      {/* Header con botón añadir usuario */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <p className="text-gray-600">
            {loading ? 'Cargando usuarios...' : pagination ? `${pagination.total} usuarios registrados` : '0 usuarios registrados'}
          </p>
        </div>
        
        <button
          onClick={createModal.open}
          className="flex items-center justify-center px-4 py-2 md:px-6 md:py-3 rounded-xl gap-2 text-white bg-blue-600 hover:bg-blue-700 transition hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full md:w-auto"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base">Añadir usuario</span>
        </button>
      </div>

      {/* Lista de usuarios */}
      <UserList 
        users={users}
        loading={loading}
        error={error}
        onEditUser={onEditUser}
        onDeleteUser={onDeleteUser}
      />

      {/* Paginación */}
      {pagination && !loading && !error && (
        <Pagination 
          pagination={pagination}
          onPageChange={onPageChange}
        />
      )}

      {/* Modal para crear usuarios */}
      <UserModal 
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        onCreateUser={onCreateUser}
        onUpdateUser={onUpdateUser}
        loading={isLoading}
        error={operationError}
      />

      {/* Modal para editar usuarios */}
      {editingUser && (
        <UserModal 
          isOpen={editModal.isOpen}
          onClose={editModal.close}
          user={editingUser}
          onCreateUser={onCreateUser}
          onUpdateUser={onUpdateUser}
          loading={isLoading}
          error={operationError}
        />
      )}

      {/* Modal de confirmación para eliminar */}
      <ConfirmDeleteModal 
        isOpen={confirmDeleteModal.isOpen}
        onClose={confirmDeleteModal.close}
        user={userToDelete}
        onConfirm={onConfirmDelete}
        loading={isLoading}
      />
    </div>
  );
};