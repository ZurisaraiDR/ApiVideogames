export type Platform = {
  id: number;
  name: string;
  abbreviation: string;
};

export type GameLanguage = {
  code: string;
  name: string;
  flag: string;
  features: string[];
};

export type GameMode = {
  id: string;
  name: string;
};

export type Game = {
  id: number;
  name: string;

  coverUrl: string;
  bannerUrl?: string;

  summary?: string;

  rating?: number;

  developer?: string;

  releaseDate?: string;

  genres?: string[];

  screenshots?: string[];

  languages?: GameLanguage[];

  gameModes?: GameMode[];

  platforms: Platform[];
};

export type HomeData = {
  categories: string[];

  featured: Game;

  topRated: Game[];

  recentlyAdded: Game[];

  popular: Game[];
};