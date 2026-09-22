import { api } from '@/api/api.config';

/* =========================================================
 * Types
 * ========================================================= */

/**
 * Basic information shared by all games.
 */
export type GameBase = {
    id: number;
    name: string;
    coverUrl: string;
    developer?: string;
    platforms: {
        id: number;
        name: string;
        abbreviation: string;
    }[];
    releaseDate?: string;
    rating?: number;
};

/**
 * Information used for featured games.
 */
export type FeaturedGame = GameBase & {
    bannerUrl: string;
    summary: string;
};

/**
 * Complete information used in the Game Details screen.
 */
export type CompleteGame = FeaturedGame & {
    genres: string[];
    screenshots: string[];
};

/* =========================================================
 * API Response Types
 * ========================================================= */

type ApiGameResponse = {
    name: 'featured' | 'popular' | 'recentlyAdded' | 'upcoming';

    result?: {
        id: number;
        name: string;

        cover?: {
            id: number;
            url: string;
        };

        artworks?: {
            id: number;
            url: string;
        }[];

        involved_companies?: {
            id: number;
            company: {
                id: number;
                name: string;
                logo?: {
                    id: number;
                    image_id: string;
                    url: string;
                };
            };
        }[];

        platforms?: {
            id: number;
            name: string;
            abbreviation?: string;
        }[];

        rating?: number;

        screenshots?: {
            id: number;
            url: string;
        }[];

        summary?: string;

        first_release_date?: number;
    }[];
};

/**
 * Object returned by adaptGameResponse().
 *
 * Example:
 *
 * {
 *   featured: [...],
 *   popular: [...],
 *   recentlyAdded: [...],
 *   upcoming: [...]
 * }
 */
export type GamesByCategory = {
    featured: FeaturedGame[];
    popular: FeaturedGame[];
    recentlyAdded: FeaturedGame[];
    upcoming: FeaturedGame[];
};

const toImageUrl = (url?: string): string => {
    if (!url) return '';

    const fullUrl = url.includes('//') && url.startsWith('//') ? `https:${url}` : url;

    return fullUrl.replace('t_thumb', 't_720p');
};

/* =========================================================
 * Adapter
 * ========================================================= */

const adaptGameResponse = (response: ApiGameResponse[]): GamesByCategory => {
    const gamesByCategory = Object.fromEntries(
        response.map(({ name, result = [] }) => [
            name,

            result.map((game): FeaturedGame => ({
                id: game.id,

                name: game.name,

                coverUrl: toImageUrl(game.cover?.url),

                developer: game.involved_companies?.[0]?.company.name,

                platforms:
                    game.platforms?.map((platform) => ({
                        id: platform.id,
                        name: platform.name,
                        abbreviation: platform.abbreviation ?? '',
                    })) ?? [],

                releaseDate: game.first_release_date
                    ? new Date(game.first_release_date * 1000).toISOString()
                    : undefined,

                rating: game.rating,

                bannerUrl: toImageUrl(game.artworks?.[0]?.url || game.screenshots?.[0]?.url),

                summary: game.summary ?? '',
            })),
        ])
    ) as Partial<GamesByCategory>;

    return {
        featured: gamesByCategory.featured ?? [],
        popular: gamesByCategory.popular ?? [],
        recentlyAdded: gamesByCategory.recentlyAdded ?? [],
        upcoming: gamesByCategory.upcoming ?? [],
    };
};

/* =========================================================
 * API
 * ========================================================= */

export const getGames = async (signal?: AbortSignal): Promise<GamesByCategory> => {
    const query = `
    query games "featured" {
      fields
        name,
        summary,
        rating,
        first_release_date,
        cover.url,
        artworks.url,
        screenshots.url,
        involved_companies.company.name,
        involved_companies.company.logo.url,
        involved_companies.company.logo.image_id,
        platforms.id,
        platforms.name,
        platforms.abbreviation;

      where rating > 85 & rating_count > 100;
      sort rating desc;
    limit 10;
    };

    query games "popular" {
      fields
        name,
        summary,
        rating,
        first_release_date,
        cover.url,
        artworks.url,
        involved_companies.company.name,
        platforms.id,
        platforms.name,
        platforms.abbreviation, 
        involved_companies.company.name;

      where rating_count > 50;
      sort total_rating_count desc;
    limit 10;
    };

    query games "recentlyAdded" {
      fields
        name,
        summary,
        rating,
        first_release_date,
        cover.url,
        artworks.url,
        platforms.id,
        platforms.name,
        platforms.abbreviation,
        involved_companies.company.name;

      where first_release_date < 1773964800
        & first_release_date > 1766188800;

      sort first_release_date desc;
    limit 10;
    };

    query games "upcoming" {
      fields
        name,
        summary,
        rating,
        first_release_date,
        cover.url,
        artworks.url,
        platforms.id,
        platforms.name,
        platforms.abbreviation,
         involved_companies.company.name, platforms.name;

      where first_release_date > 1773964800
        & hypes != null;

      sort hypes desc;
    limit 10;
    };
  `;

    const response = await api.post<ApiGameResponse[]>('/multiquery', query, { signal });

    return adaptGameResponse(response.data);
};
