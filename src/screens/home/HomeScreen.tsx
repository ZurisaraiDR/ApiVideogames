import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import HomeHeader from './components/HomeHeader';
import CategoryChip from './components/CategoryChip';
import FeaturedGameCard from './components/FeaturedGameCard';
import GameCard from './components/GameCard';
import SectionHeader from './components/SectionHeader';

import { useGames } from './hooks/useGames';

const categories = ['Todos', 'RPG', 'Acción', 'Aventura', 'Estrategia'];

export default function HomeScreen() {
  const { data: gamesData, isLoading: gamesLoading, isRefetching, error, refetch } = useGames();

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
              {categories.map((category, index) => (
                <CategoryChip key={category} label={category} selected={index === 0} />
              ))}
            </ScrollView>
          </View>

          {/* Juego destacado */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 12,
              gap: 12,
            }}
            className="mt-6">
            {gamesData?.featured.map((game, index) => (
              <View key={`${game.name}-${index}`} className="w-[340px]">
                <FeaturedGameCard game={game} />
              </View>
            ))}
          </ScrollView>

          {/* Mejores Calificados */}

          <View className="mt-6">
            <View className="px-3">
              <SectionHeader title="Más populares" />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingLeft: 12,
              }}>
              {gamesData?.popular.map((game, index) => (
                <GameCard key={game.name + index} game={game} />
              ))}
            </ScrollView>
          </View>

          {/* Recién Añadido */}

          <View className="mt-6">
            <View className="px-3">
              <SectionHeader title="Recién Añadidos" />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingLeft: 12,
              }}>
              {gamesData?.recentlyAdded.map((game, index) => (
                <GameCard key={game.id + index} game={game} />
              ))}
            </ScrollView>
          </View>

          {/* Popularmente */}

          <View className="mb-8 mt-6">
            <View className="px-3">
              <SectionHeader title="Proximamente" />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingLeft: 12,
              }}>
              {gamesData?.upcoming.map((game, index) => (
                <GameCard key={game.id + index} game={game} />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
