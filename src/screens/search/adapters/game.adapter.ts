import type { Game, Platform } from '@/types/game';

import type { IGDBGame, IGDBPlatform } from '../services/search.service';

function toImageUrl(url?: string): string {
    if (!url) return '';

    const url720p = url.replace('t_thumb', 't_720p');

    return url.startsWith('//') ? `https:${url720p}` : url720p;
}

function toPlatform(platform: IGDBPlatform): Platform {
    const abbreviationByName: Record<string, string> = {
        'Nintendo Switch': 'Switch',
        'PlayStation 4': 'PS4',
        'PlayStation 5': 'PS5',
        'Xbox One': 'Xbox One',
        'Xbox Series X|S': 'Xbox',
    };

    return {
        id: platform.id,
        name: platform.name,
        abbreviation: abbreviationByName[platform.name] ?? platform.name,
    };
}

function toReleaseDate(timestamp?: number): string | undefined {
    if (!timestamp) return undefined;

    return new Date(timestamp * 1000).toLocaleDateString('es-ES', {
        month: 'long',
        year: 'numeric',
    });
}

export function adaptIGDBGame(game: IGDBGame): Game {
    return {
        id: game.id,
        name: game.name,
        coverUrl: toImageUrl(game.cover?.url),
        summary: game.summary,
        rating: game.rating === undefined ? undefined : game.rating / 10,
        releaseDate: toReleaseDate(game.first_release_date),
        genres: game.genres?.map((genre) => genre.name),
        platforms: game.platforms?.map(toPlatform) ?? [],
    };
}

export function adaptIGDBGames(games: IGDBGame[]): Game[] {
    return games.map(adaptIGDBGame);
}
