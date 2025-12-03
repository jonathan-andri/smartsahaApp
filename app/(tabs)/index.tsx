import { Text, View } from "react-native";
import "../../global.css"
import 'react-native-reanimated';
import React from "react";
import { StatsCard } from "@/components/cards/dashCard";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
    <StatsCard title="Rendement" value={5} icon={<Ionicons name="earth" size={24} color="#4CAF50" />} backgroundColor="#E9FFEAFF"/>
  </View>
  );
}
