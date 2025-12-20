import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchBooks, GoogleBookItem } from '../services/googleBooksApi';
import { QUERY_CONFIG, SEARCH_CONFIG } from '../config/constants';

export const useBookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const { data: books, isLoading, error } = useQuery({
    queryKey: ['bookSearch', debouncedTerm],
    queryFn: () => searchBooks(debouncedTerm),
    enabled: debouncedTerm.trim().length > 0,
    staleTime: QUERY_CONFIG.STALE_TIME,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Debounce search to avoid too many API calls
    const timeout = setTimeout(() => {
      setDebouncedTerm(value);
    }, SEARCH_CONFIG.DEBOUNCE_MS);

    setSearchTimeout(timeout);
  };

  return {
    searchTerm,
    books: books || [],
    isLoading,
    error,
    handleSearch,
  };
};

export default useBookSearch; 