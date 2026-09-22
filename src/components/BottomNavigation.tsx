import { router, usePathname } from "expo-router";
import { Bookmark, House, Search } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NavigationItem = {
  route: "/" | "/search" | "/saved";
  label: string;
  icon: typeof House;
};

const navigationItems: NavigationItem[] = [
  { route: "/", label: "Inicio", icon: House },
  { route: "/search", label: "Buscar", icon: Search },
  { route: "/saved", label: "Guardados", icon: Bookmark },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row items-center justify-around border-t border-[#3A2A23] bg-[#1D201F]/95 px-5"
      style={{ paddingBottom: Math.max(insets.bottom, 10), paddingTop: 10 }}
    >
      {navigationItems.map(({ route, label, icon: Icon }) => {
        const active = route === "/" ? pathname === "/" : pathname.startsWith(route);

        return (
          <Pressable
            key={route}
            accessibilityLabel={label}
            onPress={() => router.replace(route)}
            className={`h-10 w-16 items-center justify-center rounded-full ${active ? "bg-[#2A2924]" : ""}`}
          >
            <Icon
              size={22}
              color="#EC5621"
              fill={active && route === "/saved" ? "#EC5621" : "transparent"}
              strokeWidth={2.2}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
