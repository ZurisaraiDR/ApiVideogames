import { useLocalSearchParams } from 'expo-router';
import GameDetailScreen from '@/screens/gameDetail/GameDetailScreen';

export default function GameDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <GameDetailScreen gameId={id} />;
}
