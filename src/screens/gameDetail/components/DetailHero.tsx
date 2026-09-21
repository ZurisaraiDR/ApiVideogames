import { Image } from "expo-image";
import { router } from "expo-router";
import {
  ArrowLeft,
  Bookmark,
  CalendarDays,
  Star,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { Game } from "@/types/game";

type DetailHeroProps = {
  game: Game;
};

export default function DetailHero({ game }: DetailHeroProps) {
  return (
    <View className="relative h-[510px]">
      <Image
        source={{ uri: game.bannerUrl ?? game.coverUrl }}
        contentFit="cover"
        contentPosition="center"
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

        <Pressable
          accessibilityLabel="Guardar juego"
          className="h-10 w-10 items-center justify-center rounded-full bg-[#1D1D1D]/80"
        >
          <Bookmark size={18} color="#FFFFFF" />
        </Pressable>
      </View>

      <View className="absolute bottom-0 left-0 right-0 h-[310px] bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent" />

      <View className="absolute bottom-5 left-5 right-5">
        <Text className="text-[32px] leading-[35px] text-white">
          {game.name}
        </Text>

        <View className="mt-3 flex-row items-center gap-2">
          <View className="h-10 flex-1 flex-row items-center rounded-full bg-[#1A1A1A]/90 px-2.5">
            <View className="h-7 w-7 items-center justify-center rounded-full bg-white">
              <Text className="text-[11px] font-bold text-[#E52E35]">●</Text>
            </View>
            <View className="ml-2 flex-1">
              <Text className="text-[8px] font-semibold text-white">
                Desarrollado Por:
              </Text>
              <Text numberOfLines={1} className="text-[7px] text-[#858585]">
                {game.developer ?? "Desconocida"}
              </Text>
            </View>
          </View>

          <View className="h-10 flex-1 flex-row items-center rounded-full bg-[#1A1A1A]/90 px-2.5">
            <CalendarDays size={14} color="#D0D0D0" />
            <View className="ml-2 flex-1">
              <Text className="text-[8px] font-semibold text-white">
                Fecha de salida
              </Text>
              <Text className="text-[7px] text-[#858585]">
                {game.releaseDate ?? "No disponible"}
              </Text>
            </View>
          </View>

          <View className="h-10 flex-1 rounded-full bg-[#1A1A1A]/90 px-2.5 py-2">
            <View className="flex-row items-center">
              <Star size={10} color="#FFB51B" fill="#FFB51B" />
              <Text className="ml-1 text-[8px] font-semibold text-white">
                Puntuación
              </Text>
            </View>
            <Text className="text-[7px] text-[#858585]">
              {game.rating?.toFixed(1) ?? "—"}
            </Text>
          </View>
        </View>

        <Text numberOfLines={4} className="mt-4 text-[10px] leading-[14px] text-[#A7A7A7]">
          {game.summary ?? "Sin descripción disponible."}
        </Text>
        <Text className="mt-2 text-[9px] font-semibold text-white">Ver más...</Text>
      </View>
    </View>
  );
}