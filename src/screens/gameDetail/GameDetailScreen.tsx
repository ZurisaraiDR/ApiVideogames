import { SetStateAction, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Game } from "@/types/game";

import { getGameById } from "../../services/games.service";

import DetailHero from "./components/DetailHero";
import GenresAndScreenshotsSection from "./components/GenresAndScreenshotsSection";
import GameModesSection from "./components/GameModesSection";
import LanguagesSection from "./components/LanguagesSection";
import PlatformsSection from "./components/PlatformsSection";
interface GameDetailScreenProps {
  gameId?: string;
}

export default function GameDetailScreen({ gameId }: GameDetailScreenProps) {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    let active = true;

    getGameById(gameId ?? "").then((result: SetStateAction<Game | null>) => {
      if (active) {
        setGame(result);
      }
    });

    return () => {
      active = false;
    };
  }, [gameId]);

  if (!game) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#0D0D0D]">
        <ActivityIndicator color="#F15A35" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#0D0D0D]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <DetailHero game={game} />
        <GenresAndScreenshotsSection game={game} />
        <PlatformsSection game={game} />
        <LanguagesSection game={game} />
        <GameModesSection game={game} />
      </ScrollView>
    </SafeAreaView>
  );
}
