import { Text, View, Image } from "react-native";

import { Game } from "@/types/game";

const modeImages = {
  "single-player": require("../../../../assets/singlePlayer.png"),
  multiplayer: require("../../../../assets/multiplayer.png"),
  "split-screen": require("../../../../assets/splitScreen.png"),
  "co-operative": require("../../../../assets/coOperative.png"),
  "massively-multiplayer-online-mmo": require("../../../../assets/mmo.png"),
  "battle-royale": require("../../../../assets/battleRoyale.png"),
};

const modeColors = {
  "single-player": "#FEE998",
  multiplayer: "#DDD8F5",
  "split-screen": "#AFE4F5",
  "co-operative": "#A9EDC1",
  "massively-multiplayer-online-mmo": "#FFA68F",
  "battle-royale": "#FFE68A",
};

type GameModesSectionProps = {
  game: Game;
};

export default function GameModesSection({ game }: GameModesSectionProps) {
  const modes = game.gameModes ?? [];

  return (
    <View className="mt-6 px-6 pb-8">
      <Text className="text-[14px] font-semibold text-white">
        Modos de Juego Disponibles ({modes.length})
      </Text>

      <View className="mt-4 flex-row flex-wrap gap-3">
        {modes.length > 0 && modes.map((mode) => (
            <View
              key={mode.slug}
              className="w-[47.5%] overflow-hidden rounded-2xl border border-white/10"
              style={{
                backgroundColor:
                  modeColors[mode.slug as keyof typeof modeColors],
              }}
            >
              <View className="min-h-10 justify-center  px-3 py-6">
                <Text
                  numberOfLines={2}
                  className="text-[20px] font-normal leading-[15px] text-[#171717]"
                >
                {mode.slug}
                </Text>
              </View>
              <Image
                source={modeImages[mode.slug as keyof typeof modeImages]}
                resizeMode="contain"
                className="h-32 w-full"
              />
            </View>
        ))}
      </View>
    </View>
  );
}