import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> {/* Sélection de rôle */}
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}