import { Plus } from "lucide-react";
import { UserModal } from "../components/users/UserModal";
import { UserList } from "../components/users/UserList";
import { ConfirmDeleteModal } from "../components/users/ConfirmDeleteModal";
import { Pagination } from "../components/ui";
import { useUserManagement } from "../hooks/useUserManagement";
import type { CreateUserRequest } from "../types";

export const UsersPage = () => {
  const { users, pagination, loading, error, actions, modals, changePage, changeLimit, refetch } = useUserManagement();

  const handleCreate = async (data: CreateUserRequest): Promise<boolean> => {
    const user = await actions.create(data);
    if (user) {
      refetch();
      modals.createModal.close();
      return true;
    }
    return false;
  };

  const handleUpdate = async (id: string, data: CreateUserRequest): Promise<boolean> => {
    const success = await actions.update(id, data);
    if (success) {
      refetch();
      modals.editModal.close();
      return true;
    }
    return false;
  };

  const handleDelete = async () => {
    if (!modals.userToDelete) return;
    const success = await actions.remove(modals.userToDelete.id);
    if (success) {
      refetch();
      modals.deleteModal.close();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <p className="text-gray-600">
            {loading ? 'Cargando usuarios...' : `${pagination?.total || 0} usuarios registrados`}
          </p>
        </div>
        
        <button
          onClick={modals.createModal.open}
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
        onEditUser={modals.editModal.open}
        onDeleteUser={modals.deleteModal.open}
      />

      {/* Paginación */}
      {pagination && !loading && !error && (
        <Pagination 
          pagination={pagination}
          onPageChange={changePage}
          onLimitChange={changeLimit}
        />
      )}

      {/* Modal para crear usuarios */}
      <UserModal 
        isOpen={modals.createModal.isOpen}
        onClose={modals.createModal.close}
        onCreateUser={handleCreate}
        onUpdateUser={handleUpdate}
        loading={actions.isLoading}
        error={actions.error}
      />

      {/* Modal para editar usuarios */}
      {modals.editingUser && (
        <UserModal 
          isOpen={modals.editModal.isOpen}
          onClose={modals.editModal.close}
          user={modals.editingUser}
          onCreateUser={handleCreate}
          onUpdateUser={handleUpdate}
          loading={actions.isLoading}
          error={actions.error}
        />
      )}

      {/* Modal de confirmación para eliminar */}
      <ConfirmDeleteModal 
        isOpen={modals.deleteModal.isOpen}
        onClose={modals.deleteModal.close}
        user={modals.userToDelete}
        onConfirm={handleDelete}
        loading={actions.isLoading}
      />
    </div>
  );
};