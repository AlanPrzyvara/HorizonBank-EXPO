import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import "../../global.css";
import { useColorScheme } from "@/components/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="Home"
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ color }) => <FontAwesome name="home" color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
