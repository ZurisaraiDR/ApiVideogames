// https://api.igdb.com/v4/games

import { api } from '@/api/api.config';
import { Game } from '@/types/game';
import { adaptIGDBGames } from '../adapters/game.adapter';


export interface IGDBImage {
    id: number;
    url: string;
}

export interface IGDBGenre {
    id: number;
    name: string;
}

export interface IGDBPlatform {
    id: number;
    name: string;
}

export interface IGDBGame {
    id: number;
    name: string;
    summary?: string;
    rating?: number;
    first_release_date?: number;
    cover?: IGDBImage;
    genres?: IGDBGenre[];
    platforms?: IGDBPlatform[];
}

export const searchGames = async (term: string): Promise<Game[]> => {
    const query = `
        fields name, summary, first_release_date, rating, cover.url, platforms.name, genres.name;
where name ~ *"${term}"*;
sort rating desc;
limit 10;
`;
    const response = await api.post<IGDBGame[]>('/games', query);
    return adaptIGDBGames(response.data);
};
