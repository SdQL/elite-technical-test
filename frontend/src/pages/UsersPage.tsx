import { Plus } from "lucide-react";
import { UserModal } from "../components/users/UserModal";
import { UserList } from "../components/users/UserList";
import { ConfirmDeleteModal } from "../components/users/ConfirmDeleteModal";
import { Pagination } from "../components/ui";
import { useUsers } from "../hooks/useUsers";
import { useUrlParams } from "../hooks/useUrlParams";
import { useUserModals } from "../hooks/useUserModals";
import type { CreateUserRequest } from "../types";

export const UsersPage = () => {
  // Hooks especializados - sin orquestador
  const { currentPage, limit, setCurrentPage, setLimit } = useUrlParams();
  const { users, pagination, loading, actionLoading, error, actionError, create, update, remove, clearActionError } = useUsers(currentPage, limit, setCurrentPage);
  const { 
    isCreateOpen, openCreate, closeCreate,
    editingUser, isEditOpen, openEdit, closeEdit,
    deletingUser, isDeleteOpen, openDelete, closeDelete
  } = useUserModals();

  // Handlers simplificados - lógica directa
  const handleCreate = async (data: CreateUserRequest): Promise<boolean> => {
    const success = await create(data);
    if (success) {
      closeCreate();
      clearActionError(); // Limpiar errores del formulario
      return true;
    }
    return false;
  };

  const handleUpdate = async (id: string, data: CreateUserRequest): Promise<boolean> => {
    const success = await update(id, data);
    if (success) {
      closeEdit();
      clearActionError(); // Limpiar errores del formulario
      return true;
    }
    return false;
  };

  const handleDelete = async () => {
    if (!deletingUser) return;
    const success = await remove(deletingUser.id);
    if (success) {
      closeDelete();
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
          onClick={openCreate}
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
        onEditUser={openEdit}
        onDeleteUser={openDelete}
      />

      {/* Paginación */}
      {pagination && !loading && !error && (
        <Pagination 
          pagination={pagination}
          onPageChange={setCurrentPage}
          onLimitChange={setLimit}
        />
      )}

      {/* Modal para crear usuarios */}
      <UserModal 
        isOpen={isCreateOpen}
        onClose={() => {
          closeCreate();
          clearActionError(); // Limpiar errores al cerrar
        }}
        onCreateUser={handleCreate}
        onUpdateUser={handleUpdate}
        loading={actionLoading}
        error={actionError}
      />

      {/* Modal para editar usuarios */}
      {editingUser && (
        <UserModal 
          isOpen={isEditOpen}
          onClose={() => {
            closeEdit();
            clearActionError(); // Limpiar errores al cerrar
          }}
          user={editingUser}
          onCreateUser={handleCreate}
          onUpdateUser={handleUpdate}
          loading={actionLoading}
          error={actionError}
        />
      )}

      {/* Modal de confirmación para eliminar */}
      <ConfirmDeleteModal 
        isOpen={isDeleteOpen}
        onClose={closeDelete}
        user={deletingUser}
        onConfirm={handleDelete}
        loading={actionLoading}
      />
    </div>
  );
};