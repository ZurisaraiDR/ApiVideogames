import { Bookmark } from "lucide-react-native";
import { Pressable } from "react-native";

import {
  isGameSaved,
  subscribeSavedGames,
  toggleSavedGame,
} from "@/services/saved.service";
import { useEffect, useState } from "react";

type SaveButtonProps = {
  gameId: number;
  size?: number;
};

export default function SaveButton({ gameId, size = 18 }: SaveButtonProps) {
  const [saved, setSaved] = useState(() => isGameSaved(gameId));

  useEffect(() => {
    return subscribeToSavedState(() => setSaved(isGameSaved(gameId)));
  }, [gameId]);

  return (
    <Pressable
      accessibilityLabel={saved ? "Quitar de guardados" : "Guardar juego"}
      onPress={() => toggleSavedGame(gameId)}
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
