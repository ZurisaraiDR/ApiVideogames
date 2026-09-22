import { Image } from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

const wavesBanner = require("../../../../assets/wavesBanner.png");
const controlGame = require("../../../../assets/controlGame.png");

export default function SavedHeader() {
  return (
    <View className="relative h-[145px] w-full overflow-hidden rounded-b-[30px] bg-[#EC5621]">
      <Image source={wavesBanner} resizeMode="stretch" className="absolute -top-1 h-[120px] w-[190px]" />
      <Image source={controlGame} resizeMode="contain" className="absolute right-[-5px] top-6 h-[105px] w-[105px]" />
      <Pressable
        accessibilityLabel="Volver al inicio"
        onPress={() => router.replace("/")}
        className="absolute left-4 top-10 h-10 w-10 items-center justify-center rounded-full bg-[#B9471C]/90"
      >
        <ArrowLeft size={18} color="#FFFFFF" />
      </Pressable>
      <Text className="absolute bottom-6 left-5 text-2xl text-[#1A1A1A]">Guardados</Text>
    </View>
  );
}
