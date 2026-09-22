import { ScrollView, Text, View, Image } from "react-native";

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
    <View className="mt-20 px-3">
      <Text className="px-3 text-[14px] font-semibold text-white">
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
            className="rounded-full bg-[#1A1A1A] px-5 py-2.5"
          >
            <Text className="text-[10px] text-[#D0D0D0]">{genre}</Text>
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
            className="h-[170px] w-[302px] rounded-2xl"
          />
        ))}
      </ScrollView>
    </View>
  );
}