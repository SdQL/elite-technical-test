import { useState, useEffect } from 'react';

export const useUrlParams = () => {
  // Leer página inicial desde URL
  const getInitialPage = () => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page') || '1');
    return page > 0 ? page : 1;
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);

  // Actualizar URL cuando cambie la página
  useEffect(() => {
    const url = new URL(window.location.href);
    if (currentPage === 1) {
      url.searchParams.delete('page');
    } else {
      url.searchParams.set('page', currentPage.toString());
    }
    window.history.replaceState({}, '', url.toString());
  }, [currentPage]);

  return {
    currentPage,
    setCurrentPage,
  };
};