import { Image } from "expo-image";
import { router } from "expo-router";
import { CalendarDays, Star } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { Game } from "@/types/game";

type SearchResultCardProps = {
  game: Game;
};

export default function SearchResultCard({ game }: SearchResultCardProps) {
  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: "/game/[id]", params: { id: String(game.id) } })
      }
      className="flex-row px-3 py-3"
    >
      <Image source={{ uri: game.coverUrl }} contentFit="cover" className="h-[108px] w-[80px] rounded-xl" />
      <View className="ml-4 flex-1 justify-center">
        <Text numberOfLines={1} className="text-[13px] font-medium text-white">
          {game.name}
        </Text>
        <View className="mt-2 flex-row items-center gap-2">
          <View className="flex-row items-center rounded-full bg-[#171717] px-2 py-1">
            <CalendarDays size={10} color="#A0A0A0" />
            <Text className="ml-1 text-[7px] text-[#A0A0A0]">{game.releaseDate}</Text>
          </View>
          <View className="flex-row items-center rounded-full bg-[#171717] px-2 py-1">
            <Star size={9} color="#FFB51B" fill="#FFB51B" />
            <Text className="ml-1 text-[7px] text-[#A0A0A0]">{game.rating?.toFixed(1)}</Text>
          </View>
        </View>
        <Text className="mt-3 text-[9px] text-[#B9B9B9]">
          {game.platforms.map((platform) => platform.abbreviation).join("   ")}
        </Text>
        <View className="mt-2 flex-row gap-2">
          {(game.genres ?? []).slice(0, 2).map((genre) => (
            <Text key={genre} className="rounded-full bg-[#171717] px-2 py-1 text-[7px] text-[#B9B9B9]">
              {genre}
            </Text>
          ))}
          {(game.genres?.length ?? 0) > 2 && (
            <Text className="rounded-full bg-[#171717] px-2 py-1 text-[7px] text-[#B9B9B9]">+2</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}
