import { useQuery } from "@tanstack/react-query";
import { getGames } from "@/screens/home/services/games.service";
import { getGamesByGenre } from "@/screens/home/services/categories.service";

export const useGames = () => {
    return useQuery({
        queryKey: ["games"],
        queryFn: ({ signal }) => getGames(signal),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useCategoryGames = (genreId?: number) => {
    return useQuery({
        queryKey: ["games", "genre", genreId],
        queryFn: ({ signal }) => getGamesByGenre(genreId as number, signal),
        enabled: genreId !== undefined,
        staleTime: 1000 * 60 * 5,
    });
};
