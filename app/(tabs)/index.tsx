import { Text, View } from "react-native";
import "../../global.css"
import 'react-native-reanimated';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
    <Text className="text-4xl font-bold text-red-500">
      Welcome to my project
    </Text>
  </View>
  );
}
