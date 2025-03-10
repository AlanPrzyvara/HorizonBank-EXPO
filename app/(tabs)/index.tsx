import { View, Text, TouchableOpacity } from "react-native";

export default function TabTwoScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-50 dark:bg-gray-900">
      <Text className="text-lg font-bold text-blue-500 dark:text-white">
        Testando NativeWind 🚀
      </Text>
      <TouchableOpacity className="mt-4 px-4 py-2 bg-blue-500 rounded-lg">
        <Text className="text-white font-semibold">Pressione</Text>
      </TouchableOpacity>
    </View>
  );
}
