import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BottomNavigation from '@/components/BottomNavigation';
import QueryProvider from '@/providers/QueryProvider';

import '../../global.css';


export default function RootLayout() {
  return (
    <QueryProvider>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: '#0D0D0D' },
            headerShown: false,
          }}
        />
        <BottomNavigation />
      </SafeAreaProvider>
    </QueryProvider>
  );
}