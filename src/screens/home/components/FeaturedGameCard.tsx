import { Text, View } from "react-native";

import { Image } from "expo-image";

import { Gamepad2, Star } from "lucide-react-native";

import { Game } from "@/types/game";

type FeaturedGameCardProps = {
  game: Game;
};

export default function FeaturedGameCard({
  game,
}: FeaturedGameCardProps) {
  return (
    <View className="overflow-hidden rounded-3xl ">

      <View className="relative h-[220px] w-full overflow-hidden rounded-t-3xl">
        
        <Image
          source={{
            uri: game.bannerUrl ?? game.coverUrl,
          }}
          contentFit="cover"
          contentPosition="center"
          className="h-full w-full"
        />

        <View className="absolute bottom-0 left-0 right-0 h-[140px] bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/90 to-transparent" />

        <View className="absolute right-3 top-3 flex-row items-center rounded-full bg-[#4A4A4A]/90 px-3 py-1">
          
          <Star
            size={12}
            color="#FFB51B"
            fill="#FFB51B"
          />

          <Text className="ml-1 text-[10px] font-semibold text-white">
            {game.rating?.toFixed(1) ?? "—"}
          </Text>

        </View>

        <View className="absolute bottom-4 left-4 right-4">
          <Text
            numberOfLines={3}
            className="text-lg leading-[20px] text-white"
          >
            {game.summary ?? "Sin descripción disponible."}
          </Text>
        </View>

      </View>

      <View className="flex-row items-center px-4 pb-4 mt-5">

        <Image
          source={{
            uri: game.coverUrl,
          }}
          className="h-[72px] w-[72px] rounded-full"
        />

        <View className="ml-4 flex-1 flex-row items-center">
          <View className="min-w-0 flex-1">

            <Text
              numberOfLines={1}
              className="text-xl font-bold text-white"
            >
              {game.name}
            </Text>

            <View className="mt-2 flex-row items-center">
              <Gamepad2
                size={15}
                color="#858585"
              />

              <Text className="ml-1 text-sm text-[#D0D0D0]">
                {game.platforms
                  .slice(0, 3)
                  .map(
                    (platform) =>
                      platform.abbreviation ??
                      platform.name
                  )
                  .join("   ")}
              </Text>
            </View>

          </View>

          <View className="mx-4 h-12 w-px bg-[#3A3A3A]" />

          <View className="flex-1">
            <Text className="text-lg font-semibold text-[#D0D0D0]">
              Desarrolladora:
            </Text>

            <Text
              numberOfLines={2}
              className="mt-1 text-sm text-[#D0D0D0]"
            >
              {game.developer ?? "Desconocida"}
            </Text>
          </View>

        </View>
      </View>

    </View>
  );
}