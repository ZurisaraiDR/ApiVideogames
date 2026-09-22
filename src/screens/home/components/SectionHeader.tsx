import {
  Pressable,
  Text,
  View,
} from "react-native";

import { ChevronRight } from "lucide-react-native";

type SectionHeaderProps = {
  title: string;
  onPress?: () => void;
};

export default function SectionHeader({
  title,
  onPress,
}: SectionHeaderProps) {
  return (
    <View className="mb-6 flex-row items-center justify-between">
      
      <Text className="text-md text-white">
        {title}
      </Text>

      <Pressable
        onPress={onPress}
        className="flex-row items-center"
      >
        <Text className="text-sm text-[#8C8C8C]">
          Ver todos
        </Text>

        <ChevronRight
          size={16}
          color="#8C8C8C"
          strokeWidth={2}
        />
      </Pressable>

    </View>
  );
}