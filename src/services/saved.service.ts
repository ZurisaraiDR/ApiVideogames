import { Game } from "@/types/game";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SavedListener = () => void;

const savedStorageKey = "my-expo-app.saved-games";
const savedGames = new Map<number, Game>();
const listeners = new Set<SavedListener>();
let savedGamesLoaded = false;
let loadPromise: Promise<void> | null = null;

async function persistSavedIds() {
  await AsyncStorage.setItem(
    savedStorageKey,
    JSON.stringify([...savedGames.values()]),
  );
}

export function loadSavedGames() {
  if (savedGamesLoaded) {
    return Promise.resolve();
  }

  if (!loadPromise) {
    loadPromise = AsyncStorage.getItem(savedStorageKey)
      .then((storedIds) => {
        const parsedGames = storedIds ? (JSON.parse(storedIds) as unknown[]) : [];
        parsedGames.forEach((game) => {
          if (
            typeof game === "object" &&
            game !== null &&
            "id" in game &&
            typeof game.id === "number"
          ) {
            savedGames.set(game.id, game as Game);
          }
        });
        savedGamesLoaded = true;
        notify();
      })
      .catch(() => {
        savedGamesLoaded = true;
      })
      .finally(() => {
        loadPromise = null;
      });
  }

  return loadPromise;
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function isGameSaved(gameId: number) {
  return savedGames.has(gameId);
}

export async function toggleSavedGame(game: Game) {
  await loadSavedGames();

  if (savedGames.has(game.id)) {
    savedGames.delete(game.id);
  } else {
    savedGames.set(game.id, game);
  }

  await persistSavedIds();
  notify();
}

export function getSavedGames() {
  return [...savedGames.values()];
}

export function subscribeSavedGames(listener: SavedListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
