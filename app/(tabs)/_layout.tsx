import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Analytiques',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Tableau de bord',
          tabBarIcon: ({ color }) => <MaterialIcons name="dashboard" size={28} color={color} />,
        }}
      />
       <Tabs.Screen
        name="parcel"
        options={{
          title: 'Parcelles',
          tabBarIcon: ({ color }) => <MaterialIcons name="map" size={28} color={color} />,
        }}
      />
       <Tabs.Screen
        name="Task"
        options={{
          title: 'Tâches',
          tabBarIcon: ({ color }) => <MaterialIcons name="checklist" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Yield"
        options={{
          title: 'Rendement',
          tabBarIcon: ({ color }) => <MaterialIcons name="scale" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
