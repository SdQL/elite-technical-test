import { useUsers } from './useUsers';
import { useUrlParams } from './useUrlParams';
import { useUserActions } from './useUserActions';
import { useUserModals } from './useUserModals';

export const useUserManagement = () => {
  const { currentPage, setCurrentPage } = useUrlParams();
  const { users, pagination, loading, error, refetch } = useUsers(currentPage);
  const actions = useUserActions();
  const modals = useUserModals(actions.clearErrors);

  return {
    users: users || [],
    pagination,
    loading,
    error,
    
    actions,
    modals,
    changePage: setCurrentPage,
    refetch
  };
};