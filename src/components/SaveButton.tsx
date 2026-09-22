import { Bookmark } from "lucide-react-native";
import { Pressable } from "react-native";

import { Game } from "@/types/game";
import {
  isGameSaved,
  loadSavedGames,
  subscribeSavedGames,
  toggleSavedGame,
} from "@/services/saved.service";
import { useEffect, useState } from "react";

type SaveButtonProps = {
  game: Game;
  size?: number;
};

export default function SaveButton({ game, size = 18 }: SaveButtonProps) {
  const [saved, setSaved] = useState(() => isGameSaved(game.id));

  useEffect(() => {
    let mounted = true;
    const unsubscribe = subscribeToSavedState(() => {
      if (mounted) {
        setSaved(isGameSaved(game.id));
      }
    });

    void loadSavedGames().then(() => {
      if (mounted) {
        setSaved(isGameSaved(game.id));
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [game.id]);

  return (
    <Pressable
      accessibilityLabel={saved ? "Quitar de guardados" : "Guardar juego"}
      onPress={() => void toggleSavedGame(game)}
      className="h-10 w-10 items-center justify-center rounded-full bg-[#1D1D1D]/90"
    >
      <Bookmark
        size={size}
        color={saved ? "#FFB51B" : "#FFFFFF"}
        fill={saved ? "#FFB51B" : "transparent"}
      />
    </Pressable>
  );
}

function subscribeToSavedState(listener: () => void) {
  return subscribeSavedGames(listener);
}
