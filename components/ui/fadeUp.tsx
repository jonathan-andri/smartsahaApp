import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import type { FadeUpProps } from '../type/types';

export const FadeUp: React.FC<FadeUpProps> = ({ children, delay = 0 }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(24)).current;
  
    useEffect(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 450,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 450,
          delay,
          useNativeDriver: true,
        }),
      ]).start();
    }, []);
  
    return (
      <Animated.View style={{ opacity, transform: [{ translateY }] }}>
        {children}
      </Animated.View>
    );
  };