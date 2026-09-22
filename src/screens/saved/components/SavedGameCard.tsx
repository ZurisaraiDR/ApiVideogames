import { router } from "expo-router";
import { Star } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";

import SaveButton from "@/components/SaveButton";
import { Game } from "@/types/game";

type SavedGameCardProps = {
  game: Game;
};

export default function SavedGameCard({ game }: SavedGameCardProps) {
  return (
    <Pressable
      onPress={() => router.push({ pathname: "/game/[id]", params: { id: String(game.id) } })}
      className="mb-6 w-[48.5%]"
    >
      <View className="relative">
        <Image
          source={{ uri: game.coverUrl || game.bannerUrl }}
          resizeMode="cover"
          className="aspect-[3/4] w-full rounded-xl"
        />
        <View className="absolute right-2 top-2 flex-row items-center rounded-full bg-[#1D201F]/95 px-2.5 py-1.5">
          <Star size={11} color="#FFB51B" fill="#FFB51B" />
          <Text className="ml-1 text-[11px] font-semibold text-white">
            {game.rating?.toFixed(1) ?? "—"}
          </Text>
        </View>
        <View className="absolute bottom-2 right-2">
          <SaveButton game={game} size={15} />
        </View>
      </View>
      <Text numberOfLines={2} className="mt-3 text-[14px] leading-[18px] text-white">
        {game.name}
      </Text>
      <Text numberOfLines={1} className="mt-1 text-[10px] text-[#858585]">
        {game.developer ?? "Desconocida"}
      </Text>
      <Text className="mt-2 text-[11px] text-[#B9B9B9]">
        {game.platforms.map((platform) => platform.abbreviation).join("   ")}
      </Text>
    </Pressable>
  );
}
