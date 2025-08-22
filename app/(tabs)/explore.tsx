import { Text, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <View className="bg-red-300 flex items-center justify-center h-screen">
      <Text className="font-bricolage text-lg">Regular Bricolage</Text>
      <Text className="font-bricolage text-lg font-bold">Bold Bricolage</Text>
      <Text className="font-space-mono text-lg">Local SpaceMono</Text>
    </View>
  );
}
