import { Image } from "expo-image";
import { Text, View } from "react-native";

import { Game } from "@/types/game";

const modeImages = {
  "single-player": require("../../../../assets/singlePlayer.png"),
  multiplayer: require("../../../../assets/multiplayer.png"),
  "split-screen": require("../../../../assets/splitScreen.png"),
  "co-operative": require("../../../../assets/coOperative.png"),
  mmo: require("../../../../assets/mmo.png"),
  "battle-royale": require("../../../../assets/battleRoyale.png"),
};

const modeColors = {
  "single-player": "#FEE998",
  multiplayer: "#DDD8F5",
  "split-screen": "#AFE4F5",
  "co-operative": "#A9EDC1",
  mmo: "#FFA68F",
  "battle-royale": "#FFE68A",
};

type GameModesSectionProps = {
  game: Game;
};

export default function GameModesSection({ game }: GameModesSectionProps) {
  const modes = game.gameModes ?? [];

  return (
    <View className="mt-6 px-3 pb-8">
      <Text className="text-[10px] font-semibold text-white">
        Modos de Juego Disponibles ({modes.length})
      </Text>

      <View className="mt-4 flex-row flex-wrap justify-between gap-y-2">
        {modes.map((mode) => (
          <View
            key={mode.name}
            className="relative aspect-square w-[48.5%] overflow-hidden rounded-2xl"
            style={{
              backgroundColor:
                modeColors[mode.id as keyof typeof modeColors],
            }}
          >
            <Image
              source={modeImages[mode.id as keyof typeof modeImages]}
              contentFit="contain"
              className="absolute bottom-0 h-[72%] w-full"
            />
            <Text className="absolute left-3 right-2 top-3 text-[11px] leading-[15px] text-[#171717]">
              {mode.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}