import {Stack} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import '../../global.css';


export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: '#0D0D0D' },
        }}
      >
        {/* Pantalla de inicio */}
        <Stack.Screen
        name = "index"
        options={{
          headerShown: false,
        }}
        />
        {/* Pantalla de busqueda */}
        <Stack.Screen
        name = "search"
        options={{
          headerShown: false,
        }}
        />
        {/* Pantalla de videojuegos guardados */}
        <Stack.Screen
        name = "saved"
        options={{
          headerShown: false,
        }}
        />
        {/* Pantalla de detalles del videojuego */}
        <Stack.Screen
        name = "game/[id]"
        options={{
          headerShown: false,
        }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}