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

      <View className="absolute left-4 right-4 top-5 z-10">
        <Pressable
          accessibilityLabel="Volver al inicio"
          onPress={() => router.replace("/")}
          className="h-10 w-10 items-center justify-center rounded-full bg-[#B9471C]/90"
        >
          <ArrowLeft size={18} color="#FFFFFF" />
        </Pressable>
      </View>

      <View className="z-10 gap-10 mb-4">
        <Text className="text-[37px] leading-[40px] tracking-normal text-[#1A1A1A]">
          {"Descubramos\nUn nuevo\nJuego"}
        </Text>
      </View>

      <View className="h-[62px] flex flex-row items-center justify-start gap-3 self-stretch rounded-full bg-[#151515] px-6">
          <SearchIcon size={20} color="#B9B9B9" />
          <TextInput
            value={query}
            onChangeText={onChangeQuery}
            placeholder="Search games, titles, genres..."
            placeholderTextColor="#777777"
            className="text-md text-[#B9B9B9]"
            returnKeyType="search"
          />
      </View>
    </View>
  );
}
