import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Message = {
  id: string;
  text: string;
  sender: "me" | "other";
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Salama, mba ataovy 1,000,000Ar ilay Katsaka 200KG  👋", sender: "other" },
    { id: "2", text: "Salama tena 1,300,000Ar ny farany vitako tompoko", sender: "me" },
  ]);

  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: input, sender: "me" },
    ]);

    setInput("");

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.sender === "me";

    return (
      <View
        className={`max-w-[75%] px-4 py-2 rounded-2xl mb-2 ${
          isMe
            ? "bg-emerald-500 self-end rounded-br-md"
            : "bg-gray-200 self-start rounded-bl-md"
        }`}
      >
        <Text className={isMe ? "text-white" : "text-gray-900"}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="h-14 border-b border-gray-200 px-4 flex-row items-center justify-between">
        <View className="flex flex-row items-center">
            <TouchableOpacity className="mr-3"
            onPress={() => {
              router.back()
            }}
            >
                <Ionicons name="chevron-back" size={25}/>
            </TouchableOpacity>
            <Text className="font-semibold text-lg ml-3">Razily Bekibo</Text>
        </View>
        <Ionicons name="ellipsis-vertical" size={20} />
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="flex-row items-center p-3 border-t border-gray-200">
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Message..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
          />
          <TouchableOpacity
            onPress={sendMessage}
            className="w-10 h-10 bg-emerald-500 rounded-full items-center justify-center"
          >
            <Ionicons name="send" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}