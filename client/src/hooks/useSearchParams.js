import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

export const useShopSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => ({
    search: searchParams.get('search') || '',
    sortBy: searchParams.get('sortBy') || 'name',
    sortOrder: searchParams.get('sortOrder') || 'asc',
    page: parseInt(searchParams.get('page')) || 1,
  }), [searchParams]);

  const updateParams = useCallback((updates) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value === '' || value === null || value === undefined) {
          newParams.delete(key);
        } else {
          newParams.set(key, value.toString());
        }
      });
      
      // Reset to page 1 when search or sort changes
      if (updates.search !== undefined || updates.sortBy !== undefined || updates.sortOrder !== undefined) {
        newParams.set('page', '1');
      }
      
      return newParams;
    });
  }, [setSearchParams]);

  const setSearch = useCallback((search) => {
    updateParams({ search });
  }, [updateParams]);

  const setSort = useCallback((sortBy, sortOrder) => {
    updateParams({ sortBy, sortOrder });
  }, [updateParams]);

  const setPage = useCallback((page) => {
    updateParams({ page });
  }, [updateParams]);

  return {
    params,
    setSearch,
    setSort,
    setPage,
    updateParams,
  };
};
