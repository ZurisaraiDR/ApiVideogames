import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getGames } from "@/services/games.service";
import { getSavedGames, subscribeSavedGames } from "@/services/saved.service";
import { Game } from "@/types/game";

import SavedGameCard from "./components/SavedGameCard";
import SavedHeader from "./components/SavedHeader";

export default function SavedScreen() {
  const [games, setGames] = useState<Game[]>([]);
  const [savedGames, setSavedGames] = useState<Game[]>([]);

  useEffect(() => {
    getGames().then((allGames) => {
      setGames(allGames);
      setSavedGames(getSavedGames(allGames));
    });
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeSavedGames(() =>
      setSavedGames(getSavedGames(games))
    );

    return () => {
      unsubscribe();
    };
  }, [games]);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#0D0D0D]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <SavedHeader />
        {savedGames.length ? (
          <View className="flex-row flex-wrap justify-between px-3 pt-4">
            {savedGames.map((game) => (
              <SavedGameCard key={game.id} game={game} />
            ))}
          </View>
        ) : (
          <Text className="px-6 pt-10 text-center text-sm text-[#777777]">
            Aún no tienes juegos guardados.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
