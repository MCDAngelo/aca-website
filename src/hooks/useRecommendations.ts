import { useQuery } from '@tanstack/react-query';
import { getRecommendationsByYear, getRecommendations } from '../services/supabaseService';

export const useRecommendations = (yearId?: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['recommendations', yearId],
    queryFn: () => yearId 
      ? getRecommendationsByYear(yearId)
      : getRecommendations(),
  });

  return {
    recommendations: data || [],
    isLoading,
    error,
    refetch,
  };
};

export default useRecommendations; 