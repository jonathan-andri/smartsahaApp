import { Tabs } from "expo-router";
import React from "react";

export default function UserLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="chat"
        options={{ title: "Chat", headerShown: false }}
      />
      <Tabs.Screen
        name="makeOffer"
        options={{ title: "Make Offer", headerShown: false }}
      />
      <Tabs.Screen
        name="chat/[id]"
        options={{ headerBackTitle: "Chats" }}
      />
    </Tabs>
  );
}
