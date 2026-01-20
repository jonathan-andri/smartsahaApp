import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { HapticTab } from '../../components/haptic-tab'; // Adjust the path as necessary

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3CBF96",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5
        }
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
        name="chatList"
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
