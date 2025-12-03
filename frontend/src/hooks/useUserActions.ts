import { useCreateUser } from './useCreateUser';
import { useUpdateUser } from './useUpdateUser';
import { useDeleteUser } from './useDeleteUser';

export const useUserActions = () => {
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const isLoading = createUser.loading || updateUser.loading || deleteUser.loading;
  const error = createUser.error || updateUser.error || deleteUser.error;

  return {
    create: createUser.create,
    update: updateUser.update,
    remove: deleteUser.remove,
    isLoading,
    error,
    clearErrors: () => {
      createUser.clearError();
      updateUser.clearError();
    }
  };
};