// components/cards/ParcelListCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type ParcelListItemProps = {
  id: string;
  name: string;
  cropType: string;
  area: number;
  status: 'active' | 'pending' | 'harvested';
  nextAction?: string;
  nextActionDate?: string;
  onPress?: (id: string) => void;
};

export const ParcelListCard = ({
  id,
  name,
  cropType,
  area,
  status,
  nextAction,
  nextActionDate,
  onPress,
}: ParcelListItemProps) => {
  const statusConfig = {
    active: { color: 'bg-green-500', text: 'Active', icon: 'leaf' },
    pending: { color: 'bg-yellow-500', text: 'En attente', icon: 'time' },
    harvested: { color: 'bg-blue-500', text: 'Récoltée', icon: 'checkmark-circle' },
  };

  const config = statusConfig[status];

  return (
    <TouchableOpacity
      onPress={() => onPress?.(id)}
      activeOpacity={0.7}
      className="bg-white p-4 rounded-xl border border-gray-200 mb-3 shadow-sm"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <View className="flex-row items-center">
            <View className={`w-3 h-3 rounded-full ${config.color} mr-2`} />
            <Text className="font-bold text-gray-900">{name}</Text>
          </View>
          <Text className="text-gray-600 text-sm mt-1">{cropType}</Text>
        </View>
        
        <View className="items-end">
          <Text className="font-bold text-lg text-gray-900">{area} ha</Text>
          <Text className="text-gray-500 text-xs">Superficie</Text>
        </View>
      </View>
      
      {nextAction && (
        <View className="flex-row items-center mt-3 pt-3 border-t border-gray-100">
          <Ionicons name={config.icon as any} size={16} color="#6B7280" />
          <Text className="text-gray-700 ml-2 text-sm flex-1">
            {nextAction}
          </Text>
          {nextActionDate && (
            <Text className="text-gray-500 text-xs">{nextActionDate}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};