import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

export const CartBar = () => {
  const [expanded, setExpanded] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(expanded ? 300 : 72, { duration: 300 }), // Replace 300 with your desired height
  }));

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => setExpanded(!expanded)}>
      <Animated.View
        className="bg-primary"
        style={[
          {
            position: 'absolute',
            bottom: 24,
            left: 24,
            right: 24,
            borderRadius: 36,
            paddingHorizontal: 24,
            paddingVertical: 16,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 10,
          },
          animatedStyle,
        ]}
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-white font-semibold">Panier</Text>
            <Text className="text-white/80 text-xs">0 Offres</Text>
          </View>
        </View>

        {expanded && (
          <View className="mt-4">
            <Text className="text-white">Panier vide</Text>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};
