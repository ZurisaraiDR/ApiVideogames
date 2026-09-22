import { useQuery } from '@tanstack/react-query';

import { searchGames } from '@/screens/search/services/search.service';

export function useIgdbGames(query: string) {
  const normalizedQuery = query.trim();

  return useQuery({
    queryKey: ['igdb', 'games', normalizedQuery],
    queryFn: () => searchGames(normalizedQuery),
    enabled: normalizedQuery.length >= 2,
    staleTime: 5 * 60_000,
  });
}
