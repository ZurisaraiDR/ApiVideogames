import { api } from "@/api/api.config";

import {
    Game,
    GameLanguage,
    GameMode,
    Platform,
} from "@/types/game";

/* =========================================================
 * API TYPES
 * ========================================================= */

type ApiLanguageSupport = {
    id?: number;

    language?: {
        id?: number;
        name?: string;
    };

    language_support_type?: {
        id?: number;
        name?: string;
    };
};

type ApiGameResponse = {
    id: number;
    name: string;

    cover?: {
        url?: string;
    };

    artworks?: {
        url?: string;
    }[];

    first_release_date?: number;

    game_modes?: {
        id?: number;
        slug?: string;
        name?: string;
    }[];

    genres?: {
        name?: string;
    }[];

    involved_companies?: {
        company?: {
            name?: string;
        };

        developer?: boolean;
    }[];

    platforms?: {
        id?: number;
        name?: string;
        abbreviation?: string;
    }[];

    screenshots?: {
        url?: string;
    }[];

    summary?: string;

    language_supports?: ApiLanguageSupport[];

    rating?: number;
};

/* =========================================================
 * HELPERS
 * ========================================================= */

const toImageUrl = (url?: string): string => {
    if (!url) return "";

    return (
        url.startsWith("//")
            ? `https:${url}`
            : url
    ).replace("t_thumb", "t_720p");
};

/* =========================================================
 * LANGUAGES
 * ========================================================= */

const languageFlags: Record<string, string> = {
    arabic: "🇸🇦",
    chinese: "🇨🇳",
    english: "🇺🇸",
    french: "🇫🇷",
    german: "🇩🇪",
    italian: "🇮🇹",
    japanese: "🇯🇵",
    korean: "🇰🇷",
    portuguese: "🇵🇹",
    russian: "🇷🇺",
    spanish: "🇪🇸",
    ukrainian: "🇺🇦",
};

const supportLabels: Record<string, string> = {
    audio: "Audio",
    dubbed: "Audio",
    interface: "Interface",
    subtitles: "Subtitles",
    subtitle: "Subtitles",
    text: "Interface",
};

const normalize = (value: string): string => {
    return value.trim().toLowerCase();
};

const adaptLanguages = (
    supports: ApiLanguageSupport[] = []
): GameLanguage[] => {
    const languages = new Map<string, GameLanguage>();

    supports.forEach((support) => {
        const name = support.language?.name?.trim();

        if (!name) return;

        const key = normalize(name);

        const language =
            languages.get(key) ??
            {
                code: String(support.language?.id ?? key),
                name,
                flag: languageFlags[key] ?? "🌐",
                features: [],
            };

        const feature =
            supportLabels[
            normalize(
                support.language_support_type?.name ?? ""
            )
            ];

        if (
            feature &&
            !language.features.includes(feature)
        ) {
            language.features.push(feature);
        }

        languages.set(key, language);
    });

    return [...languages.values()];
};

/* =========================================================
 * RELEASE DATE
 * ========================================================= */

const formatDate = (
    timestamp?: number
): string | undefined => {
    if (!timestamp) return undefined;

    const date = new Date(timestamp * 1000);

    const formatted = date.toLocaleDateString(
        "es-ES",
        {
            month: "long",
            day: "numeric",
            year: "numeric",
        }
    );

    return (
        formatted.charAt(0).toUpperCase() +
        formatted.slice(1)
    );
};

/* =========================================================
 * GAME MODES
 * ========================================================= */

/**
 * IGDB game mode IDs
 *
 * 1 -> Single player
 * 2 -> Multiplayer
 * 3 -> Co-operative
 * 4 -> Split screen
 * 5 -> Massively Multiplayer Online (MMO)
 * 6 -> Battle Royale
 */
const gameModeSlugs: Record<number, string> = {
    1: "single-player",
    2: "multiplayer",
    3: "co-operative",
    4: "split-screen",
    5: "massively-multiplayer-online-mmo",
    6: "battle-royale",
};

const adaptGameModes = (
    modes: ApiGameResponse["game_modes"] = []
): GameMode[] => {
    return modes.flatMap((mode) => {
        if (!mode.id) return [];

        const slug = gameModeSlugs[mode.id];

        if (!slug) return [];

        return [
            {
                id: String(mode.id),
                slug,
            },
        ];
    });
};

/* =========================================================
 * GAME ADAPTER
 * ========================================================= */

const adaptGameResponse = (
    game: ApiGameResponse
): Game => ({
    id: game.id,

    name: game.name,

    coverUrl: toImageUrl(
        game.cover?.url
    ),

    bannerUrl: toImageUrl(
        game.artworks?.[0]?.url ??
        game.screenshots?.[0]?.url
    ),

    summary: game.summary ?? "",

    releaseDate: formatDate(
        game.first_release_date
    ),

    developer:
        game.involved_companies?.find(
            (company) => company.developer
        )?.company?.name,

    genres:
        game.genres?.flatMap((genre) =>
            genre.name
                ? [genre.name]
                : []
        ) ?? [],

    screenshots:
        game.screenshots?.flatMap(
            (screenshot) => {
                const url = toImageUrl(
                    screenshot.url
                );

                return url ? [url] : [];
            }
        ) ?? [],

    languages: adaptLanguages(
        game.language_supports
    ),

    gameModes: adaptGameModes(
        game.game_modes
    ),

    platforms:
        game.platforms?.flatMap(
            (platform): Platform[] =>
                platform.id && platform.name
                    ? [
                        {
                            id: platform.id,
                            name: platform.name,
                            abbreviation:
                                platform.abbreviation ??
                                platform.name,
                        },
                    ]
                    : []
        ) ?? [],

    rating: game.rating,
});

/* =========================================================
 * QUERY
 * ========================================================= */

const query = `
  fields
    name,
    cover.url,
    artworks.url,
    summary,
    first_release_date,

    involved_companies.developer,
    involved_companies.company.name,

    genres.name,

    platforms.id,
    platforms.name,
    platforms.abbreviation,

    screenshots.url,

    language_supports.language.id,
    language_supports.language.name,
    language_supports.language_support_type.name,

    game_modes.id,
    game_modes.name,
    game_modes.slug,

    rating;

  where id = {gameId};
`;

/* =========================================================
 * API
 * ========================================================= */

export const fetchGameDetails = async (
    gameId: number,
    signal?: AbortSignal
): Promise<Game> => {
    const response = await api.post<
        ApiGameResponse[]
    >(
        "/games",
        query.replace(
            "{gameId}",
            String(gameId)
        ),
        { signal }
    );

    const [game] = response.data;

    if (!game) {
        throw new Error(
            "No se encontró el juego solicitado."
        );
    }

    return adaptGameResponse(game);
};