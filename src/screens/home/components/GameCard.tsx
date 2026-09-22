import {
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

import { Star } from "lucide-react-native";

import { router } from "expo-router";

import { Game } from "@/types/game";
import SaveButton from "@/components/SaveButton";
type GameCardProps = {
  game: Game;
  className?: string;
};

export default function GameCard({
  game,
  className,
}: GameCardProps) {
  const handlePress = () => {
    router.push({
      pathname: "/game/[id]",
      params: {
        id: String(game.id),
      },
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      className={className}
    >
      <View className="relative">
        <Image
          source={{ uri: game.coverUrl }}
          resizeMode="cover"
          className="h-[200px] w-full rounded-[2px]"
        />

        <View className="absolute right-2 top-2 flex-row items-center rounded-full bg-[#1D201F]/90 px-2 py-1">
          <Star
            size={12}
            color="#FFB51B"
            fill="#FFB51B"
          />

          <Text className="ml-1 text-sm font-semibold text-white">
            {game.rating?.toFixed(1) ?? "—"}
          </Text>
        </View>

        {/* <View className="absolute right-2 bottom-2">
          <SaveButton game={game} size={15} />
        </View> */}
      </View>

      <Text
        numberOfLines={1}
        className="mt-2 text-sm font-medium text-white"
      >
        {game.name}
      </Text>

      <Text
        numberOfLines={1}
        className="mt-1 text-sm text-[#777777]"
      >
        {game.developer ?? "Desconocida"}
      </Text>
    </Pressable>
  );
}