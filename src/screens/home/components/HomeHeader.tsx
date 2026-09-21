import { Image, Pressable, Text, View } from 'react-native';

import { Search } from 'lucide-react-native';

import { router } from 'expo-router';

const wavesBanner = require('../../../../assets/wavesBanner.png');
const controlGame = require('../../../../assets/controlGame.png');

export default function HomeHeader() {
  return (
    <View className="relative h-[250px] w-full overflow-hidden rounded-[32px] bg-[#EC5621]">
      <Image
        source={wavesBanner}
        resizeMode="stretch"
        className="absolute -top-1 h-[190px] w-[285px]"
      />

      <Image
        source={controlGame}
        resizeMode="contain"
        className="absolute right-[-5px] top-10 h-[145px] w-[145px]"
      />

      <View className="z-10 mt-10 flex flex-col px-4 pt-5">
        <Text className="text-3xl leading-[28px] text-[#1A1A1A]">
          {'Descubramos\nUn nuevo\nJuego'}
        </Text>

        <Pressable
          onPress={() => router.push('/search')}
          className="mt-8 h-[42px] w-full flex flex-row items-center justify-start rounded-full bg-[#151515] px-3 gap-3">
          <Search size={20} color="#B9B9B9" strokeWidth={2} />

          <Text className="text-xl text-[#B9B9B9]">Search games, titles, genres...</Text>
        </Pressable>
      </View>
    </View>
  );
}
