import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import HomeHeader from "./components/HomeHeader";
import CategoryChip from "./components/CategoryChip";
import FeaturedGameCard from "./components/FeaturedGameCard";
import GameCard from "./components/GameCard";
import SectionHeader from "./components/SectionHeader";

import { useHomeGames } from "@/hooks/useHomeGames";

export default function HomeScreen() {
  const {
    data,
    loading,
    refreshing,
    error,
    refresh,
  } = useHomeGames();

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#0D0D0D]">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator
            size="small"
            color="#F15A35"
          />

          <Text className="mt-3 text-xs text-[#777777]">
            Cargando juegos...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !data) {
    return (
      <SafeAreaView className="flex-1 bg-[#0D0D0D]">
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-center text-sm text-white">
            {error ?? "No hay información disponible."}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-[#0D0D0D]"
    >
      <View className="flex-1">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refresh}
              tintColor="#F15A35"
            />
          }
        >
        <HomeHeader />

        {/* Categorías */}

        <View className="mt-3 w-full flex">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 12,
              gap: 12,
              flexGrow: 1,
            }}
          >
            {data.categories.map(
              (category, index) => (
                <CategoryChip
                  key={category}
                  label={category}
                  selected={index === 0}
                />
              )
            )}
          </ScrollView>
        </View>

        {/* Juego destacado */}

        <View className="mx-3 mt-4">
          <FeaturedGameCard
            game={data.featured}
          />
        </View>

        {/* Mejores Calificados */}

        <View className="mt-6">

          <View className="px-3">
            <SectionHeader
              title="Mejores Calificados"
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 12,
            }}
          >
            {data.topRated.map((game) => (
              <GameCard
                key={game.id}
                game={game}
              />
            ))}
          </ScrollView>

        </View>

        {/* Recién Añadido */}

        <View className="mt-6">

          <View className="px-3">
            <SectionHeader
              title="Recién Añadido"
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 12,
            }}
          >
            {data.recentlyAdded.map(
              (game) => (
                <GameCard
                  key={game.id}
                  game={game}
                />
              )
            )}
          </ScrollView>

        </View>

        {/* Popularmente */}

        <View className="mb-8 mt-6">

          <View className="px-3">
            <SectionHeader
              title="Popularmente"
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 12,
            }}
          >
            {data.popular.map((game) => (
              <GameCard
                key={game.id}
                game={game}
              />
            ))}
          </ScrollView>

        </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}