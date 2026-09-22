import { Image } from "react-native";
import { router } from "expo-router";
import { ArrowLeft, Search as SearchIcon } from "lucide-react-native";
import { Pressable, Text, TextInput, View } from "react-native";

const wavesBanner = require("../../../../assets/wavesBanner.png");
const controlGame = require("../../../../assets/controlGame.png");

type SearchHeaderProps = {
  query: string;
  onChangeQuery: (query: string) => void;
};

export default function SearchHeader({ query, onChangeQuery }: SearchHeaderProps) {
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

      <View className="absolute left-4 right-4 top-5 z-10">
        <Pressable
          accessibilityLabel="Volver al inicio"
          onPress={() => router.replace("/")}
          className="h-10 w-10 items-center justify-center rounded-full bg-[#B9471C]/90"
        >
          <ArrowLeft size={18} color="#FFFFFF" />
        </Pressable>
      </View>

      <View className="absolute left-4 right-4 top-[92px] z-10">
        <Text className="text-3xl leading-[28px] text-[#1A1A1A]">
          {"Descubramos\nUn nuevo\nJuego"}
        </Text>
      </View>

      <View className="absolute bottom-[18px] left-4 right-4 z-10 h-[42px] flex-row items-center rounded-full bg-[#151515] px-3">
          <SearchIcon size={17} color="#A8A8A8" />
          <TextInput
            value={query}
            onChangeText={onChangeQuery}
            placeholder="Search games, titles, genres..."
            placeholderTextColor="#777777"
            className="ml-2 flex-1 text-sm text-white"
            returnKeyType="search"
          />
      </View>
    </View>
  );
}
