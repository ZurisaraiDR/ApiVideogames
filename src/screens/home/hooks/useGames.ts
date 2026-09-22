import { useQuery } from "@tanstack/react-query";
import { getGames } from "@/screens/home/services/games.service";

export const useGames = () => {
    return useQuery({
        queryKey: ["games"],
        queryFn: ({ signal }) => getGames(signal),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
