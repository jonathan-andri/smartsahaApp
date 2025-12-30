import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
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
          title: 'Offres',
          tabBarIcon: ({ color }) => <Ionicons name="pricetag" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="createOffer"
        options={{
          title: 'Créer des offres',
          tabBarIcon: ({ color }) => <MaterialIcons name="more" size={28} color={color} />,
        }}
      />
       <Tabs.Screen
        name="chat"
        options={{
          title: 'Discussion',
          tabBarIcon: ({ color }) => <MaterialIcons name="chat" size={28} color={color} />,
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
    </Tabs>
  );
}
