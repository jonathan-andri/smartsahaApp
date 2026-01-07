import { colorSelect } from "@/components/colorSelector";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { formatNumberShort } from '../../components/formatNumberShort';
import { Item } from "../type/types";

export const CropCard = ({ item, index }) => {
    const scale = useRef(new Animated.Value(0.9)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const handleItemPress = (item: Item) => {
        router.push({
          pathname: "/makeOffer",
          params: { item: JSON.stringify(item) },
        });
      };
      
  
    useEffect(() => {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 400,
          delay: index * 80,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          delay: index * 80,
          useNativeDriver: true,
        }),
      ]).start();
    }, []);
  
    return (
      <Animated.View
        style={{ transform: [{ scale }], opacity }}
        className={`flex-1 rounded-3xl p-4 m-2 ${colorSelect(item.title)}`}
      > 
        <TouchableOpacity onPress={() => handleItemPress(item)} className=" flex-1 h-48 justify-between overflow-hidden">
          <View>
            <Text className="text-neutral-900 font-semibold text-base">{item.title}</Text>
            <Text className="text-neutral-500 text-xs mb-2">{item.stock} KG</Text>
          </View>
          <Image source={item.image} className="w-full h-32 top-7 absolute" resizeMode="contain" />
          <View className="flex-row items-center justify-between mt-3">
            <Text className="text-sm font-semibold text-neutral-900">Ar {formatNumberShort(item.price)}</Text>
            <TouchableOpacity className="bg-emerald-500 w-8 h-8 rounded-full items-center justify-center">
              <Text className="text-white font-bold">+</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };