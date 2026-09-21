import { ChevronRight } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

import { Game } from "@/types/game";

type LanguagesSectionProps = {
  game: Game;
};

export default function LanguagesSection({ game }: LanguagesSectionProps) {
  const languages = game.languages ?? [];

  return (
    <View className="mt-6">
      <View className="flex-row items-center justify-between px-3">
        <Text className="text-[16px] font-semibold text-white">
          Idiomas Disponibles ({languages.length})
        </Text>
        <View className="flex-row items-center">
          <Text className="text-[12px] text-[#999999]">Ver todos</Text>
          <ChevronRight size={16} color="#999999" />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 12,
        }}
        className="mt-4"
      >
        {languages.map((language) => (
          <View key={language.name} className="h-[180px] w-[185px] rounded-3xl bg-[#151515] p-4">
            <Text className="text-[20px] text-white">
              {language.flag} {language.name}
            </Text>
            <View className="mt-6 flex-row flex-wrap gap-2">
              {language.features.map((feature) => (
                <Text key={feature} className="rounded-full bg-[#080808] px-2.5 py-1.5 text-[11px] text-white">
                  {feature}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}