import { Image } from "expo-image";
import { Text, View } from "react-native";

import { Game } from "@/types/game";

const controlGameBlack = require("../../../../assets/controlGameBlack.png");

type PlatformsSectionProps = {
  game: Game;
};

export default function PlatformsSection({ game }: PlatformsSectionProps) {
  return (
    <View className="mt-6 px-3">
      <View className="flex-row items-center">
        <View className="mr-4 h-8 w-12">
          <Image
            source={controlGameBlack}
            contentFit="contain"
            className="h-full w-full"
          />
        </View>
        <Text className="text-[10px] font-semibold text-white">
          Plataformas Disponibles:
        </Text>
      </View>

      <View className="mt-4 flex-row flex-wrap gap-2">
        {(game.platforms.length ? game.platforms : [{ id: 0, name: "PC", abbreviation: "PC" }]).map(
          (platform) => (
            <View key={platform.id} className="aspect-square w-[23%] items-center justify-center rounded-2xl bg-[#151515]">
              <Text className="text-[10px] text-white">{platform.abbreviation}</Text>
            </View>
          )
        )}
      </View>
    </View>
  );
}