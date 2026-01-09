import { Stack } from "expo-router";
import React from "react";

export default function UserLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="chat"
        options={{ title: "Chat" , headerShown: false}}
        
      />
        <Stack.Screen
        name="makeOffer"
        options={{ title: "Chat" , headerShown: false}}
        
      />
      <Stack.Screen
        name="chat/[id]"
        options={{ headerBackTitle: "Chats" }}
      />
    </Stack>
  );
}
