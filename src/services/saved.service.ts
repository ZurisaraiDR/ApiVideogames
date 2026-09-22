import { Game } from "@/types/game";

type SavedListener = () => void;

const savedStorageKey = "my-expo-app.saved-games";

function readSavedIds() {
  if (typeof localStorage === "undefined") {
    return [];
  }

  try {
    const storedIds = localStorage.getItem(savedStorageKey);
    return storedIds ? (JSON.parse(storedIds) as number[]) : [];
  } catch {
    return [];
  }
}

const savedIds = new Set<number>(readSavedIds());
const listeners = new Set<SavedListener>();

function persistSavedIds() {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(savedStorageKey, JSON.stringify([...savedIds]));
  }
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function isGameSaved(gameId: number) {
  return savedIds.has(gameId);
}

export function toggleSavedGame(gameId: number) {
  if (savedIds.has(gameId)) {
    savedIds.delete(gameId);
  } else {
    savedIds.add(gameId);
  }

  persistSavedIds();
  notify();
}

export function getSavedGames(games: Game[]) {
  return games.filter((game) => savedIds.has(game.id));
}

export function subscribeSavedGames(listener: SavedListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
