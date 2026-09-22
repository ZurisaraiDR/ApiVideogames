import { ActivityIndicator, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DetailHero from './components/DetailHero';
import GenresAndScreenshotsSection from './components/GenresAndScreenshotsSection';
import GameModesSection from './components/GameModesSection';
import LanguagesSection from './components/LanguagesSection';
import PlatformsSection from './components/PlatformsSection';
import { useGameDetails } from './hook/useGameDetails';
interface GameDetailScreenProps {
  gameId?: string;
}

export default function GameDetailScreen({ gameId }: GameDetailScreenProps) {
  const { data: game, isLoading, error } = useGameDetails(gameId);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#0D0D0D]">
        <ActivityIndicator color="#F15A35" />
      </SafeAreaView>
    );
  }

  if (error || !game) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#0D0D0D] px-8">
        <Text className="text-center text-sm text-white">
          {error instanceof Error ? error.message : 'No se encontró el juego.'}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#0D0D0D]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <DetailHero game={game} />
        <GenresAndScreenshotsSection game={game} />
        <PlatformsSection game={game} />
        <LanguagesSection game={game} />
        <GameModesSection game={game} />
      </ScrollView>
    </SafeAreaView>
  );
}
