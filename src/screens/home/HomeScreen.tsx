import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';
import { useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import HomeHeader from './components/HomeHeader';
import CategoryChip from './components/CategoryChip';
import FeaturedGameCard from './components/FeaturedGameCard';
import GameCard from './components/GameCard';
import SectionHeader from './components/SectionHeader';

import { useCategoryGames, useGames } from './hooks/useGames';

const categories = [
  { label: 'Todos' },
  { label: 'Shooter', id: 5 },
  { label: 'Puzzle', id: 9 },
  { label: 'RPG', id: 12 },
  { label: 'Simulador', id: 13 },
  { label: 'Estrategia', id: 15 },
  { label: 'Aventura', id: 31 },
];

export default function HomeScreen() {
  const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>();
  const { data: gamesData, isLoading: gamesLoading, isRefetching, error, refetch } = useGames();
  const {
    data: categoryGames,
    isLoading: categoryLoading,
    error: categoryError,
  } = useCategoryGames(selectedGenreId);

  if (gamesLoading) {
    return (
      <SafeAreaView className="flex-1 bg-[#0D0D0D]">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="small" color="#F15A35" />

          <Text className="mt-3 text-xs text-[#777777]">Cargando juegos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !gamesData) {
    return (
      <SafeAreaView className="flex-1 bg-[#0D0D0D]">
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-center text-sm text-white">
            {error instanceof Error ? error.message : 'No hay información disponible.'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#0D0D0D]">
      <View className="flex-1 p-2">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#F15A35" />
          }>
          <HomeHeader />

          {/* Categorías */}

          <View className="mt-6 flex w-full">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 12,
                gap: 8,
                flexGrow: 1,
              }}>
              {categories.map((category) => (
                <CategoryChip
                  key={category.label}
                  label={category.label}
                  selected={selectedGenreId === category.id}
                  onPress={() => setSelectedGenreId(category.id)}
                />
              ))}
            </ScrollView>
          </View>

          {selectedGenreId === undefined ? (
            <>
              {/* Juego destacado */}

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 12,
                  gap: 12,
                }}
                className="mt-6">
                {gamesData.featured.map((game, index) => (
                  <View key={`${game.name}-${index}`} className="w-[340px]">
                    <FeaturedGameCard game={game} />
                  </View>
                ))}
              </ScrollView>

              {/* Más populares */}

              <View className="mt-6">
                <View className="px-3">
                  <SectionHeader title="Más populares" />
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 12 }}>
                  {gamesData.popular.map((game, index) => (
                    <GameCard key={game.id + index} game={game} />
                  ))}
                </ScrollView>
              </View>

              {/* Recién añadido */}

              <View className="mt-6">
                <View className="px-3">
                  <SectionHeader title="Recién Añadidos" />
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 12 }}>
                  {gamesData.recentlyAdded.map((game, index) => (
                    <GameCard key={game.id + index} game={game} />
                  ))}
                </ScrollView>
              </View>

              {/* Próximamente */}

              <View className="mb-8 mt-6">
                <View className="px-3">
                  <SectionHeader title="Proximamente" />
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 12 }}>
                  {gamesData.upcoming.map((game, index) => (
                    <GameCard key={game.id + index} game={game} />
                  ))}
                </ScrollView>
              </View>
            </>
          ) : (
            <View className="mt-6">
              <View className="px-3">
                <SectionHeader
                  title={categories.find((category) => category.id === selectedGenreId)?.label ?? 'Catálogo'}
                />
              </View>

              {categoryLoading ? (
                <ActivityIndicator className="py-8" size="small" color="#F15A35" />
              ) : categoryError ? (
                <Text className="px-3 text-sm text-[#777777]">No se pudieron cargar los juegos.</Text>
              ) : (
                <View className="flex-row flex-wrap justify-between px-3">
                  {categoryGames?.map((game, index) => (
                    <GameCard
                      key={game.id + index}
                      game={game}
                      className="mb-6 w-[48%]"
                    />
                  ))}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
