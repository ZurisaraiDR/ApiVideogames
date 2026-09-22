import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Star } from "lucide-react-native";

import CategoryChip from "@/screens/home/components/CategoryChip";
import GameCard from "@/screens/home/components/GameCard";
import { Genre } from "@/screens/home/services/categories.service";
import { Game } from "@/types/game";

const platforms = [
  { id: 6, name: "PC" },
  { id: 169, name: "XBOX" },
  { id: 167, name: "PS" },
  { id: 130, name: "NINTENDO" },
];

const gameModes = [
  {
    id: 1,
    slug: "single-player",
    image: require("../../../../assets/singlePlayer.png"),
    color: "#FFE68A",
  },
  {
    id: 2,
    slug: "multiplayer",
    image: require("../../../../assets/multiplayer.png"),
    color: "#DDD8F5",
  },
  {
    id: 4,
    slug: "split-screen",
    image: require("../../../../assets/splitScreen.png"),
    color: "#AFE4F5",
  },
  {
    id: 3,
    slug: "co-operative",
    image: require("../../../../assets/coOperative.png"),
    color: "#A9EDC1",
  },
  {
    id: 5,
    slug: "massively-multiplayer-online-mmo",
    image: require("../../../../assets/mmo.png"),
    color: "#FFA68F",
  },
  {
    id: 6,
    slug: "battle-royale",
    image: require("../../../../assets/battleRoyale.png"),
    color: "#FFE68A",
  },
];

type SearchFiltersProps = {
  topRated: Game[];
  genres: Genre[];
  genreGames: Game[];
  genreLoading: boolean;
  genreFetching: boolean;
  platformGames: Game[];
  platformLoading: boolean;
  platformFetching: boolean;
  modeGames: Game[];
  modeLoading: boolean;
  modeFetching: boolean;
  selectedModeId?: number;
  onModeSelect: (modeId?: number) => void;
  selectedPlatformId?: number;
  onPlatformSelect: (platformId?: number) => void;
  selectedGenreId?: number;
  onGenreSelect: (genreId?: number) => void;
};

export default function SearchFilters({
  topRated,
  genres,
  genreGames,
  genreLoading,
  genreFetching,
  platformGames,
  platformLoading,
  platformFetching,
  modeGames,
  modeLoading,
  modeFetching,
  selectedModeId,
  onModeSelect,
  selectedPlatformId,
  onPlatformSelect,
  selectedGenreId,
  onGenreSelect,
}: SearchFiltersProps) {
  return (
    <View className="gap-5 px-3 pb-5 pt-5">
      <View>
        <Text className="text-xl font-medium text-white">Por Plataforma</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 0, gap: 8 }}
          className="mt-3"
        >
          {platforms.map((platform) => (
            <CategoryChip
              key={platform.id}
              label={platform.name}
              selected={selectedPlatformId === platform.id}
              onPress={() =>
                onPlatformSelect(
                  selectedPlatformId === platform.id ? undefined : platform.id,
                )
              }
            />
          ))}
        </ScrollView>
      </View>

      {selectedPlatformId !== undefined && (
        <View>
          {platformLoading || platformFetching ? (
            <ActivityIndicator className="py-8" color="#F15A35" />
          ) : platformGames.length ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 0, gap: 16 }}
            >
              {platformGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </ScrollView>
          ) : (
            <Text className="px-3 py-4 text-sm text-[#777777]">
              No se encontraron juegos para esta plataforma.
            </Text>
          )}
        </View>
      )}

      <View>
        <Text className="text-xl font-medium text-white">Por Género</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
          className="mt-3"
        >
          {genres.map((genre) => (
            <CategoryChip
              key={genre.id}
              label={genre.name}
              selected={selectedGenreId === genre.id}
              onPress={() =>
                onGenreSelect(
                  selectedGenreId === genre.id ? undefined : genre.id,
                )
              }
            />
          ))}
        </ScrollView>
      </View>

      {selectedGenreId !== undefined && (
        <View>
          {genreLoading || genreFetching ? (
            <ActivityIndicator className="py-8" color="#F15A35" />
          ) : genreGames.length ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 0, gap: 16 }}
            >
              {genreGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </ScrollView>
          ) : (
            <Text className="px-3 py-4 text-sm text-[#777777]">
              No se encontraron juegos para este género.
            </Text>
          )}
        </View>
      )}

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
            <Pressable
              key={mode.id}
              onPress={() =>
                onModeSelect(selectedModeId === mode.id ? undefined : mode.id)
              }
              className="relative aspect-square w-[190px] overflow-hidden rounded-2xl"
              style={{ backgroundColor: mode.color }}
            >
              <Image
                source={mode.image}
                resizeMode="contain"
                className="absolute bottom-0 h-[74%] w-full"
              />
              <Text className="absolute left-3 right-2 top-3 text-[15px] leading-[19px] text-[#171717]">
                {mode.slug}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {selectedModeId !== undefined && (
        <View>
          {modeLoading || modeFetching ? (
            <ActivityIndicator className="py-8" color="#F15A35" />
          ) : modeGames.length ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 0, gap: 16 }}
            >
              {modeGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </ScrollView>
          ) : (
            <Text className="px-3 py-4 text-sm text-[#777777]">
              No se encontraron juegos para este modo.
            </Text>
          )}
        </View>
      )}

      {/* <View className="mt-1">
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
      </View> */}
    </View>
  );
}
