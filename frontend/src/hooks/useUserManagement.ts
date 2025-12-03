import { useUsers } from './useUsers';
import { useUrlParams } from './useUrlParams';
import { useUserActions } from './useUserActions';
import { useUserModals } from './useUserModals';

export const useUserManagement = () => {
  const { currentPage, limit, setCurrentPage, setLimit } = useUrlParams();
  const { users, pagination, loading, error, refetch } = useUsers(currentPage, limit);
  const actions = useUserActions();
  const modals = useUserModals(actions.clearErrors);

  return {
    users: users || [],
    pagination,
    currentPage,
    limit,
    loading,
    error,
    
    actions,
    modals,
    changePage: setCurrentPage,
    changeLimit: setLimit,
    refetch
  };
};