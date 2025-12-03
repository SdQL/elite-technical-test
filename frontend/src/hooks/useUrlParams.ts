// hooks/useUrlParams.ts
import { useState, useEffect } from 'react';

export const useUrlParams = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);

  // Leer parámetros de la URL al cargar
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    const limitParam = urlParams.get('limit');

    if (pageParam) setCurrentPage(Number(pageParam));
    if (limitParam) setLimit(Number(limitParam));
  }, []);

  // Actualizar URL cuando cambian los parámetros
  const updateUrl = (page: number, newLimit: number) => {
    const url = new URL(window.location.href);

    // Solo agregar parámetros si no son los defaults
    if (page > 1) {
      url.searchParams.set('page', page.toString());
    } else {
      url.searchParams.delete('page');
    }

    if (newLimit !== 8) { 
      url.searchParams.set('limit', newLimit.toString());
    } else {
      url.searchParams.delete('limit');
    }

    window.history.replaceState({}, '', url.toString());
  };

  const setCurrentPageAndUpdate = (page: number) => {
    setCurrentPage(page);
    updateUrl(page, limit);
  };

  const setLimitAndUpdate = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1);
    updateUrl(1, newLimit);
  };

  return {
    currentPage,
    limit,
    setCurrentPage: setCurrentPageAndUpdate,
    setLimit: setLimitAndUpdate,
  };
};