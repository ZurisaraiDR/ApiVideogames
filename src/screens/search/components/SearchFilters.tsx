import { ScrollView, Text, View } from "react-native";
import { Star } from "lucide-react-native";

import { Image as ExpoImage } from "expo-image";

import CategoryChip from "@/screens/home/components/CategoryChip";
import GameCard from "@/screens/home/components/GameCard";
import { Game } from "@/types/game";

const filters = {
  "Por Género": ["RPG", "Aventura", "Estrategia", "Acción"],
};

const platforms = ["PC", "PS5", "Xbox", "Nintendo"];

const gameModes = [
  {
    id: "single-player",
    name: "Single-Player",
    image: require("../../../../assets/singlePlayer.png"),
    color: "#FFE68A",
  },
  {
    id: "multiplayer",
    name: "Multiplayer",
    image: require("../../../../assets/multiplayer.png"),
    color: "#DDD8F5",
  },
  {
    id: "split-screen",
    name: "Split Screen",
    image: require("../../../../assets/splitScreen.png"),
    color: "#AFE4F5",
  },
  {
    id: "co-operative",
    name: "Co-Operative",
    image: require("../../../../assets/coOperative.png"),
    color: "#A9EDC1",
  },
  {
    id: "mmo",
    name: "Massively Multiplayer Online (MMO)",
    image: require("../../../../assets/mmo.png"),
    color: "#FFA68F",
  },
  {
    id: "battle-royale",
    name: "Battle Royale",
    image: require("../../../../assets/battleRoyale.png"),
    color: "#FFE68A",
  },
];

type SearchFiltersProps = {
  topRated: Game[];
};

export default function SearchFilters({ topRated }: SearchFiltersProps) {
  return (
    <View className="gap-5 px-3 pb-5 pt-5">
      <View>
        <Text className="text-xl font-medium text-white">
          Por Plataforma
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
          className="mt-3"
        >
          {platforms.map((platform) => (
            <View
              key={platform}
              className="h-20 w-20 items-center justify-center rounded-2xl bg-[#151515]"
            >
              <Text className="text-xl text-white">{platform}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {Object.entries(filters).map(([title, options]) => (
        <View key={title}>
          <Text className="text-xl font-medium text-white">{title}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
            className="mt-3"
          >
            {options.map((option) => (
              <CategoryChip key={option} label={option} />
            ))}
          </ScrollView>
        </View>
      ))}

      <View>
        <Text className="text-xl font-medium text-white">
          Por modo de juego
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
          className="mt-3"
        >
          {gameModes.map((mode) => (
            <View
              key={mode.id}
              className="relative aspect-square w-[190px] overflow-hidden rounded-2xl"
              style={{ backgroundColor: mode.color }}
            >
              <ExpoImage
                source={mode.image}
                contentFit="contain"
                className="absolute bottom-0 h-[74%] w-full"
              />
              <Text className="absolute left-3 right-2 top-3 text-[15px] leading-[19px] text-[#171717]">
                {mode.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className="mt-1">
        <View className="mb-3 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Star size={11} color="#FFB51B" fill="#FFB51B" />
            <Text className="ml-1 text-[11px] font-medium text-white">
              Mejores Calificados
            </Text>
          </View>
          <Text className="text-[9px] text-[#8C8C8C]">Ver todos ›</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 3 }}
        >
          {topRated.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
