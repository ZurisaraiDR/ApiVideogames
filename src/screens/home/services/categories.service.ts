import { api } from '@/api/api.config';
import type { Game, Platform } from '@/types/game';

interface IGDBCategoryGame {
    id: number;
    name: string;
    rating?: number;
    cover?: {
        id: number;
        url: string;
    };
    platforms?: {
        id: number;
        name: string;
        abbreviation?: string;
    }[];
    involved_companies?: {
        company: {
            name: string;
        };
    }[];
}

const toImageUrl = (url?: string): string => {
    if (!url) return '';

    const imageUrl = url.startsWith('//') ? `https:${url}` : url;
    return imageUrl.replace('t_thumb', 't_720p');
};

const toPlatform = (platform: NonNullable<IGDBCategoryGame['platforms']>[number]): Platform => ({
    id: platform.id,
    name: platform.name,
    abbreviation: platform.abbreviation ?? platform.name,
});

const adaptCategoryGame = (game: IGDBCategoryGame): Game => ({
    id: game.id,
    name: game.name,
    coverUrl: toImageUrl(game.cover?.url),
    developer: game.involved_companies?.[0]?.company.name,
    platforms: game.platforms?.map(toPlatform) ?? [],
    rating: game.rating === undefined ? undefined : game.rating / 10,
});

export const getGamesByGenre = async (genreId: number, signal?: AbortSignal): Promise<Game[]> => {
    const query = `
        fields name, rating, cover.url, platforms.name, platforms.abbreviation,
        involved_companies.company.name;
        where rating_count != null & rating_count > 50 & genres = ${genreId};
        sort rating desc;
        limit 15;
    `;

    const response = await api.post<IGDBCategoryGame[]>('/games', query, { signal });
    return response.data.map(adaptCategoryGame);
};

