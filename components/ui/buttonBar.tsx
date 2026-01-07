import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import type { BottomBarProps } from '../type/types';

export const BottomBar: React.FC<BottomBarProps> = ({ onConfirm }) => (
  <TouchableOpacity 
    onPress={onConfirm} 
    className="flex-row items-center justify-between bg-white rounded-full px-2 py-2 border border-neutral-200"
  >
    <TouchableOpacity className="px-8 py-3 rounded-full">
      <Text className="font-semibold text-3xl">Confirmer</Text>
    </TouchableOpacity>
    <TouchableOpacity className="bg-primary w-28 h-16 rounded-full items-center justify-center">
      <Ionicons name="pricetag" size={20} color={"white"}/>
    </TouchableOpacity>
  </TouchableOpacity>
);
