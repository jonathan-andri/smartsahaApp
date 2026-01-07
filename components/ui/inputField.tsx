import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import type { InputFieldProps } from '../type/types';

export const InputField: React.FC<InputFieldProps> = ({ 
    value, 
    placeholder, 
    suffix, 
    icon, 
    onChangeText 
  }) => (
    <View className="flex-row items-center border border-neutral-200 rounded-full px-5 py-4">
      <TextInput 
        value={value} 
        onChangeText={onChangeText} 
        placeholder={placeholder} 
        className="flex-1" 
      />
      {suffix && <Text className="text-neutral-500">{suffix}</Text>}
      {icon && <Ionicons name="location" size={20} color="black" />}
    </View>
  );
  