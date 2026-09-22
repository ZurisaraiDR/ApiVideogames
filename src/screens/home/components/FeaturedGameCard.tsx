import { Image, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Gamepad2, Star } from "lucide-react-native";
import { router } from "expo-router";
import { FeaturedGame } from "../services/games.service";

type FeaturedGameCardProps = {
  game: FeaturedGame;
};

export default function FeaturedGameCard({
  game,
}: FeaturedGameCardProps) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/game/[id]",
          params: { id: String(game.id) },
        })
      }
      className="overflow-hidden rounded-3xl"
    >

      <View className="relative h-[220px] w-full rounded-t-3xl">

        <Image
          source={{
            uri: game.bannerUrl,
          }}
          className="h-full w-full"
        />

        <LinearGradient
          colors={[
            "transparent",
            "rgba(13,13,13,0.85)",
            "#0D0D0D",
          ]}
          locations={[0, 0.45, 1]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 160,
          }}
        />

        <View className="absolute right-3 top-3 flex-row items-center rounded-full bg-[#4A4A4A]/90 px-3 py-1">
          <Star
            size={12}
            color="#FFB51B"
            fill="#FFB51B"
          />

          <Text className="ml-1 text-[12px] font-semibold text-white">
            {game.rating?.toFixed(1) ?? "—"}
          </Text>
        </View>

        <View className="absolute bottom-0 left-4 right-4">
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className="text-xs leading-[14px] text-white/80"
          >
            {game.summary ?? "Sin descripción disponible."}
          </Text>
        </View>

      </View>

      <View className="mt-5 flex-row items-center">

        <Image
          source={{
            uri: game.coverUrl,
          }}
          className="size-16 rounded-full"
        />

        <View className="ml-4 flex-1 flex-row items-center">

          <View className="min-w-0 flex-1">

            <Text
              numberOfLines={1}
              className="text-sm font-bold text-white"
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
                      platform.abbreviation ?? platform.name
                  )
                  .join("   ")}
              </Text>
            </View>

          </View>

          {/* <View className="mx-4 h-12 w-px bg-[#3A3A3A]" /> */}

          {/* <View className="flex-1">
            <Text className="text-sm font-semibold text-[#D0D0D0]">
              Desarrolladora:
            </Text>

            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              className="mt-1 text-sm text-[#d0d0d0b4]"
            >
              {game.developer ?? "Desconocida"}
            </Text>
          </View> */}

        </View>
      </View>

    </Pressable>
  );
}