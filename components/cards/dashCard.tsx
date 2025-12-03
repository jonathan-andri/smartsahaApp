// components/cards/StatsCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export type StatsCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  avatarUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  onPress?: () => void;
  showChevron?: boolean;
  size?: 'small' | 'medium' | 'large';
  iconPosition?: 'left' | 'right';
  variant?: 'default' | 'outlined' | 'filled';
};

export const StatsCard = ({
  title,
  value,
  icon,
  avatarUrl,
  backgroundColor = 'bg-white',
  textColor = 'text-gray-900',
  onPress,
  showChevron = false,
  size = 'medium',
  iconPosition = 'right',
  variant = 'default',
}: StatsCardProps) => {
  // Tailles prédéfinies
  const sizeClasses = {
    small: 'p-3 rounded-lg',
    medium: 'p-4 rounded-xl',
    large: 'p-6 rounded-2xl',
  };

  const titleSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  const valueSizeClasses = {
    small: 'text-lg font-bold',
    medium: 'text-xl font-bold',
    large: 'text-2xl font-bold',
  };

  const variantClasses = {
    default: 'border border-gray-200',
    outlined: 'border-2 border-gray-300',
    filled: 'border-0 shadow-sm',
  };

  const CardContent = () => (
    <View
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${backgroundColor}
        ${textColor}
        flex-row items-center justify-between
        ${variant === 'filled' ? 'shadow-sm' : ''}
      `}
    >
      {/* Côté gauche : Avatar/Icon + Texte */}
      <View className="flex-row items-center flex-1">
        {iconPosition === 'left' && (icon || avatarUrl) && (
          <View className="mr-3">
            {avatarUrl ? (
              <Image
                source={{ uri: avatarUrl }}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <View className="w-10 h-10 items-center justify-center rounded-full bg-gray-100">
                {icon}
              </View>
            )}
          </View>
        )}

        <View className="flex-1">
          <Text className={`${titleSizeClasses[size]} text-gray-600`}>
            {title}
          </Text>
          <Text className={`${valueSizeClasses[size]} mt-1`}>{value}</Text>
        </View>

        {iconPosition === 'right' && (icon || avatarUrl) && (
          <View className="ml-3">
            {avatarUrl ? (
              <Image
                source={{ uri: avatarUrl }}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <View className="w-10 h-10 items-center justify-center rounded-full bg-gray-100">
                {icon}
              </View>
            )}
          </View>
        )}
      </View>

      {/* Chevron à droite si demandé */}
      {showChevron && (
        <View className="ml-2">
          <Text className="text-gray-400">›</Text>
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
};