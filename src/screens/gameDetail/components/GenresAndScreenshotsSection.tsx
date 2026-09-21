import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";

import { Game } from "@/types/game";

type GenresAndScreenshotsSectionProps = {
  game: Game;
};

export default function GenresAndScreenshotsSection({
  game,
}: GenresAndScreenshotsSectionProps) {
  const genres = game.genres ?? [];
  const screenshots = game.screenshots ?? [];

  return (
    <View className="mt-6">
      <Text className="px-3 text-[11px] font-semibold text-white">
        Género y capturas del juego
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 12,
        }}
        className="mt-3"
      >
        {genres.map((genre) => (
          <View
            key={genre}
            className="rounded-full bg-[#1A1A1A] px-3 py-2"
          >
            <Text className="text-[8px] text-[#D0D0D0]">{genre}</Text>
          </View>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 8,
          paddingHorizontal: 12,
        }}
        className="mt-3"
      >
        {screenshots.map((screenshot) => (
          <Image
            key={screenshot}
            source={{ uri: screenshot }}
            contentFit="cover"
            className="h-[170px] w-[302px] rounded-2xl"
          />
        ))}
      </ScrollView>
    </View>
  );
}