

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const conversations = [
  {
    id: "1",
    name: "Razily Bekibo",
    lastMessage: "mba ataovy anízay namana ah",
    time: "10:24",
    unread: 2,
  },
  {
    id: "2",
    name: "Rabenanahary Mirana",
    lastMessage: "Salama, efa azonao ve ilay entana?",
    time: "09:10",
    unread: 0,
  },
];

export default function ConversationsScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        // navigation.navigate("Chat", {
        //   conversationId: item.id,
        //   name: item.name,
        // })
        router.push("/chat")
      }
      className="flex-row items-center px-4 py-3 border-b border-gray-100"
    >
      {/* Avatar */}
      <View className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center mr-3">
        <Ionicons name="person" size={20} />
      </View>

      {/* Content */}
      <View className="flex-1">
        <Text className="font-semibold">{item.name}</Text>
        <Text className="text-gray-500 text-sm" numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>

      {/* Meta */}
      <View className="items-end">
        <Text className="text-xs text-gray-400">{item.time}</Text>
        {item.unread > 0 && (
          <View className="bg-emerald-500 rounded-full px-2 mt-1">
            <Text className="text-white text-xs">{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="h-14 px-4 border-b border-gray-200 flex-row items-center justify-between">
        <Text className="text-xl font-semibold">Discussions</Text>
        <Ionicons name="create-outline" size={22} />
      </View>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

