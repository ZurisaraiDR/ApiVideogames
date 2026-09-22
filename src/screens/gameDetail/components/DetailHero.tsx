import { Image } from "react-native";
import { router } from "expo-router";
import {
  ArrowLeft,
  Bookmark,
  CalendarDays,
  Star,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { Game } from "@/types/game";
import SaveButton from "@/components/SaveButton";
import { LinearGradient } from "expo-linear-gradient";

type DetailHeroProps = {
  game: Game;
};

export default function DetailHero({ game }: DetailHeroProps) {
  return (
    <View className="relative h-[510px]">
      <Image
        source={{ uri: game.bannerUrl ?? game.coverUrl }}
        className="absolute inset-0"
      />

      <View className="absolute left-4 right-4 top-4 z-10 flex-row items-center justify-between">
        <Pressable
          accessibilityLabel="Volver"
          onPress={() => router.replace("/")}
          className="h-10 w-10 items-center justify-center rounded-full bg-[#1D1D1D]/80"
        >
          <ArrowLeft size={20} color="#FFFFFF" />
        </Pressable>

        <View className="mx-3 h-16 items-center justify-center rounded-full border border-[#3A241D] bg-[#1A110E]/90 px-12 py-2">
          <Text className="text-sm text-white">DETALLES</Text>
          <Text
            numberOfLines={1}
            className="mt-1 text-[12px] text-[#8E8582]"
          >
            {game.name.toUpperCase()}
          </Text>
        </View>

        <SaveButton gameId={game.id} />
      </View>

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
          height: 290,
        }}
      />

      <View className="absolute -bottom-12 left-5 right-5">
        <Text
          numberOfLines={2}
          className="text-[32px] leading-[35px] text-white">
          {game.name}
        </Text>

        <View className="mt-3 flex-row items-center gap-2">
          {/* Developer */}
          <View className="h-14 flex-1 flex-row items-center rounded-full bg-[#1A1A1A]/90 px-3">
            <View className="h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">
              <Text className="text-[11px] font-bold text-[#E52E35]">●</Text>
            </View>

            <View className="ml-2 flex-1 ">
              <Text
                numberOfLines={1}
                className="text-[8px] font-semibold text-white"
              >
                Desarrollado Por:
              </Text>

              <Text
                numberOfLines={1}
                className="text-[10px] mt-0.5 text-[#858585]"
              >
                {game.developer ?? "Desconocida"}
              </Text>
            </View>
          </View>

          {/* Release date */}
          <View className="h-14 flex-1 flex-row items-center rounded-full bg-[#1A1A1A]/90 px-3">
            <CalendarDays size={18} color="#D0D0D0" />

            <View className="ml-2 flex-1">
              <Text
                numberOfLines={1}
                className="text-[8px] font-semibold text-white"
              >
                Fecha de salida
              </Text>

              <Text
                numberOfLines={1}
                className="text-[10px] mt-0.5 text-[#858585]"
              >
                {game.releaseDate ?? "No disponible"}
              </Text>
            </View>
          </View>

          {/* Rating */}
          <View className="h-14 flex-row items-center gap-1 rounded-full bg-[#1A1A1A]/90 px-3">
            <Star size={11} color="#FFB51B" fill="#FFB51B" />

            <Text className="text-[8px] font-semibold text-white">
              {game.rating?.toFixed(1) ?? "—"}
            </Text>
          </View>
        </View>
        ```


        <Text numberOfLines={4} className="mt-4 text-[12px] leading-[16px] text-[#A7A7A7]">
          {game.summary ?? "Sin descripción disponible."}
        </Text>
        {/* <Text className="mt-2 text-[9px] font-semibold text-white">Ver más...</Text> */}
      </View>
    </View>
  );
}