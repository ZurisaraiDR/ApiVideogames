import {
  Pressable,
  Text,
} from "react-native";

type CategoryChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function CategoryChip({
  label,
  selected = false,
  onPress,
}: CategoryChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full px-8 py-4 ${
        selected
          ? "bg-[#EFEFEF]"
          : "bg-[#191919]"
      }`}
    >
      <Text
        className={`text-md ${
          selected
            ? "text-[#111111]"
            : "text-[#8A8A8A]"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}