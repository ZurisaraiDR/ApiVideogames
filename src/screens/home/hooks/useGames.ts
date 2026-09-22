import { useQuery } from "@tanstack/react-query";
import { getGames } from "@/screens/home/services/games.service";
import {
    getGamesByGenre,
    getGamesByMode,
    getGamesByPlatform,
} from "@/screens/home/services/categories.service";

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

export const usePlatformGames = (platformId?: number) => {
    return useQuery({
        queryKey: ["games", "platform", platformId],
        queryFn: ({ signal }) => getGamesByPlatform(platformId as number, signal),
        enabled: platformId !== undefined,
        staleTime: 1000 * 60 * 5,
    });
};

export const useModeGames = (modeId?: number) => {
    return useQuery({
        queryKey: ["games", "mode", modeId],
        queryFn: ({ signal }) => getGamesByMode(modeId as number, signal),
        enabled: modeId !== undefined,
        staleTime: 1000 * 60 * 5,
    });
};

