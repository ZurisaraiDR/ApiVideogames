import { Image, Pressable, Text, View } from 'react-native';

import { Search } from 'lucide-react-native';

import { router } from 'expo-router';

const wavesBanner = require('../../../../assets/wavesBanner.png');
const controlGame = require('../../../../assets/controlGame.png');

export default function HomeHeader() {
  return (
    <View className="relative self-start w-full overflow-hidden rounded-[38px] bg-[#EC5621] px-4 py-10 pt-16">
      <Image
        source={wavesBanner}
        resizeMode="stretch"
        className="absolute -top-1 h-[190px] w-[285px]"
      />

      <Image
        source={controlGame}
        resizeMode="contain"
        className="absolute right-[-15px] top-16 h-[145px] w-[145px]"
      />

      <View className="z-10 gap-6">
        <Text className="text-[37px] leading-[40px] tracking-normal text-[#1A1A1A]">
          {'Descubramos\nUn Nuevo\nJuego'}
        </Text>

        <Pressable
          onPress={() => router.push('/search')}
          className="h-[62px] flex flex-row items-center justify-start gap-3 self-stretch rounded-full bg-[#151515] px-6">
          <Search size={20} color="#B9B9B9" strokeWidth={2} />

          <Text className="text-md text-[#B9B9B9]">Search games, titles, genres...</Text>
        </Pressable>
      </View>
    </View>
  );
}
