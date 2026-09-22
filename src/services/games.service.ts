import { Game, GameLanguage, GameMode } from "@/types/game";

const languages: GameLanguage[] = [
  {
    code: "en",
    name: "English",
    flag: "🇺🇸",
    features: ["Interface", "Audio", "Subtitles"],
  },
  {
    code: "es",
    name: "Spanish",
    flag: "🇪🇸",
    features: ["Interface", "Audio", "Subtitles"],
  },
  {
    code: "de",
    name: "German",
    flag: "🇩🇪",
    features: ["Interface"],
  },
  {
    code: "it",
    name: "Italian",
    flag: "🇮🇹",
    features: ["Interface", "Subtitles"],
  },
];

const gameModes: GameMode[] = [
  { id: "single-player", name: "Single-Player" },
  { id: "multiplayer", name: "Multiplayer" },
  { id: "split-screen", name: "Split Screen" },
  { id: "co-operative", name: "Co-Operative" },
  { id: "mmo", name: "Massively Multiplayer Online (MMO)" },
  { id: "battle-royale", name: "Battle Royale" },
];

type GameSeed = Pick<Game, "id" | "name" | "coverUrl" | "platforms"> &
  Partial<Omit<Game, "id" | "name" | "coverUrl" | "platforms">>;

function createGame(seed: GameSeed): Game {
  return {
    bannerUrl: seed.coverUrl,
    summary:
      "Una aventura memorable con un mundo lleno de historias por descubrir.",
    rating: 8.5,
    developer: "Estudio desconocido",
    releaseDate: "Disponible desde 2016",
    genres: ["Role-playing (RPG)", "Adventure"],
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc5wvh.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc5wvi.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc5wvj.jpg",
    ],
    languages,
    gameModes,
    ...seed,
  };
}

const mockGames: Game[] = [
  createGame({
    id: 1,
    name: "The Witcher 3: Wild Hunt",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg",
    bannerUrl:
      "https://images.igdb.com/igdb/image/upload/t_1080p/co1wyy.jpg",
    summary:
      "The Witcher 3: Wild Hunt – Game of the Year Edition is a complete version of the game released in August 2016 for PC, PlayStation 4, and Xbox One.",
    rating: 9.8,
    developer: "CD Projekt RED",
    releaseDate: "Agosto 2016",
    genres: ["Role-playing (RPG)", "Adventure"],
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc5wvh.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc5wvi.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc5wvj.jpg",
    ],
    platforms: [
      { id: 1, name: "PC", abbreviation: "PC" },
      { id: 2, name: "PlayStation 5", abbreviation: "PS5" },
      { id: 3, name: "Xbox", abbreviation: "Xbox" },
      { id: 4, name: "Nintendo Switch", abbreviation: "Nintendo" },
    ],
  }),
  createGame({
    id: 2,
    name: "Bloodborne",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7f.jpg",
    summary: "Explora una ciudad gótica consumida por una enfermedad misteriosa.",
    rating: 9.3,
    developer: "FromSoftware",
    releaseDate: "Marzo 2015",
    platforms: [{ id: 2, name: "PlayStation 4", abbreviation: "PS4" }],
  }),
  createGame({
    id: 3,
    name: "The Witcher 3",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg",
    rating: 9.2,
    developer: "CD Projekt RED",
    releaseDate: "Mayo 2015",
    platforms: [{ id: 1, name: "PC", abbreviation: "PC" }],
  }),
  createGame({
    id: 4,
    name: "Portal 2",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rs3.jpg",
    summary: "Resuelve ingeniosos rompecabezas usando portales y física.",
    rating: 9.1,
    developer: "Valve",
    releaseDate: "Abril 2011",
    platforms: [{ id: 1, name: "PC", abbreviation: "PC" }],
  }),
  createGame({
    id: 5,
    name: "The Last of Us",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7f.jpg",
    summary:
      "Una historia de supervivencia y vínculos humanos en un mundo devastado.",
    rating: 9.0,
    developer: "Naughty Dog",
    releaseDate: "Junio 2013",
    platforms: [{ id: 2, name: "PlayStation", abbreviation: "PS" }],
  }),
  createGame({
    id: 6,
    name: "The Witcher 3",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg",
    rating: 9.2,
    developer: "CD Projekt RED",
    releaseDate: "Mayo 2015",
    platforms: [{ id: 1, name: "PC", abbreviation: "PC" }],
  }),
  createGame({
    id: 7,
    name: "The Last of Us",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7f.jpg",
    rating: 9.0,
    developer: "Naughty Dog",
    releaseDate: "Junio 2013",
    platforms: [{ id: 2, name: "PlayStation", abbreviation: "PS" }],
  }),
  createGame({
    id: 8,
    name: "The Witcher 3",
    coverUrl:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg",
    rating: 9.2,
    developer: "CD Projekt RED",
    releaseDate: "Mayo 2015",
    platforms: [{ id: 1, name: "PC", abbreviation: "PC" }],
  }),
];

const categories = ["Todos", "RPG", "Acción", "Aventura", "Estrategia"];

const searchGamesData: Game[] = [
  createGame({
    id: 101,
    name: "Minecraft: Java Edition",
    coverUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co49x5.jpg",
    rating: 9.8,
    developer: "Mojang Studios",
    releaseDate: "Agosto 2011",
    genres: ["Simulator", "Adventure"],
    platforms: [
      { id: 1, name: "PC", abbreviation: "PC" },
      { id: 2, name: "PlayStation 5", abbreviation: "PS5" },
      { id: 3, name: "Xbox", abbreviation: "Xbox" },
    ],
  }),
  createGame({
    id: 102,
    name: "Minecraft: Dungeons",
    coverUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2wq4.jpg",
    rating: 9.0,
    developer: "Mojang Studios",
    releaseDate: "Mayo 2020",
    genres: ["Simulator", "Adventure"],
    platforms: [
      { id: 1, name: "PC", abbreviation: "PC" },
      { id: 2, name: "PlayStation 4", abbreviation: "PS4" },
      { id: 3, name: "Xbox", abbreviation: "Xbox" },
    ],
  }),
  createGame({
    id: 103,
    name: "Minecraft: Story Mode",
    coverUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1t2k.jpg",
    rating: 8.7,
    developer: "Telltale Games",
    releaseDate: "Octubre 2015",
    genres: ["Simulator", "Adventure"],
    platforms: [
      { id: 1, name: "PC", abbreviation: "PC" },
      { id: 2, name: "PlayStation 4", abbreviation: "PS4" },
      { id: 3, name: "Xbox", abbreviation: "Xbox" },
    ],
  }),
];

export async function getGames(): Promise<Game[]> {
  return Promise.resolve([...mockGames, ...searchGamesData]);
}

export async function getHomeData(signal?: AbortSignal) {
  void signal;
  const games = await getGames();

  return {
    categories,
    featured: games[0],
    topRated: [games[1], games[2], games[3]],
    recentlyAdded: [games[4], games[5]],
    popular: [games[6], games[7]],
  };
}

export async function getGameById(id: string): Promise<Game | null> {
  const games = await getGames();
  return games.find((game) => String(game.id) === id) ?? null;
}

export async function searchGames(query: string): Promise<Game[]> {
  const normalizedQuery = query.trim().toLowerCase();
  const games = await getGames();

  return games.filter((game) =>
    [game.name, game.developer, ...(game.genres ?? [])]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery)
  );
}

