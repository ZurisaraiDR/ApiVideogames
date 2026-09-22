import { router } from "expo-router";
import { CalendarDays, Star } from "lucide-react-native";
import { Pressable, Text, View, Image } from "react-native";

import { Game } from "@/types/game";
import SaveButton from "@/components/SaveButton";

type SearchResultCardProps = {
  game: Game;
};

export default function SearchResultCard({ game }: SearchResultCardProps) {
  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: "/game/[id]", params: { id: String(game.id) } })
      }
      className="flex-row px-3 py-4"
    >
      <View className="relative">
        <Image
          source={{ uri: game.coverUrl }}
          resizeMode="cover"
          className="h-[150px] w-[112px] rounded-xl"
        />
        <View className="absolute right-1 top-1">
          <SaveButton game={game} size={15} />
        </View>
      </View>
      <View className="ml-5 flex-1 justify-center">
        <Text numberOfLines={1} className="text-[16px] font-medium text-white">
          {game.name}
        </Text>
        <View className="mt-3 flex-row items-center gap-2">
          <View className="flex-row items-center rounded-full bg-[#171717] px-2.5 py-1.5">
            <CalendarDays size={11} color="#A0A0A0" />
            <Text className="ml-1 text-[8px] text-[#A0A0A0]">{game.releaseDate}</Text>
          </View>
          <View className="flex-row items-center rounded-full bg-[#171717] px-2.5 py-1.5">
            <Star size={10} color="#FFB51B" fill="#FFB51B" />
            <Text className="ml-1 text-[8px] text-[#A0A0A0]">{game.rating?.toFixed(1)}</Text>
          </View>
        </View>
        <Text className="mt-4 text-[11px] text-[#B9B9B9]">
          {game.platforms.map((platform) => platform.abbreviation).join("   ")}
        </Text>
        <View className="mt-3 flex-row flex-wrap gap-2">
          {(game.genres ?? []).slice(0, 2).map((genre) => (
            <Text key={genre} className="rounded-full bg-[#171717] px-2.5 py-1.5 text-[8px] text-[#B9B9B9]">
              {genre}
            </Text>
          ))}
          {(game.genres?.length ?? 0) > 2 && (
            <Text className="rounded-full bg-[#171717] px-2.5 py-1.5 text-[8px] text-[#B9B9B9]">+2</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}
