import { Stack } from "expo-router";
import React from "react";

export default function UserLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="chatList"
        options={{ title: "Chat" }}
      />
      <Stack.Screen
        name="chat/[id]"
        options={{ headerBackTitle: "Chats" }}
      />
    </Stack>
  );
}
