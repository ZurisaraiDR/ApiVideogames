import { useQuery } from '@tanstack/react-query';

import { fetchGameDetails } from '../services/game.service';

export const useGameDetails = (gameId?: string) => {
  const parsedGameId = Number(gameId);

  return useQuery({
    queryKey: ['game-details', parsedGameId],
    queryFn: ({ signal }) => fetchGameDetails(parsedGameId, signal),
    enabled: Number.isInteger(parsedGameId) && parsedGameId > 0,
    staleTime: 1000 * 60 * 5,
  });
};
