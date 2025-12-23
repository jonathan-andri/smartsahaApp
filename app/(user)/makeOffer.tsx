import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";


/* =====================
   Reusable Components
===================== */

const FadeSlide = ({ children, delay = 0 }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
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

const QuantitySelector = ({ value }) => (
  <View className="flex-row items-center justify-center px-10 mt-6">
    <Text className="text-3xl font-semibold self-center">{value} KG</Text>
  </View>
);

const PricePill = ({ price, onIncrease, onDecrease }) => (
  <View className=" w-[250px] bg-primary flex-row items-center justify-between self-center px-3 py-2 mt-6 rounded-full">
   <TouchableOpacity onPress={onDecrease} className="w-12 h-12 rounded-full bg-white items-center justify-center">
      <Text className="text-4xl text-neutral-900">−</Text>
    </TouchableOpacity>

    <Text className="text-2xl font-semibold">Ar {price}</Text>

    <TouchableOpacity onPress={onIncrease} className="w-12 h-12 rounded-full bg-white items-center justify-center">
      <Text className="text-4xl text-neutral-900">+</Text>
    </TouchableOpacity>
  </View>
);

const BottomBar: React.FC<{ onConfirm: () => void }> = ({ onConfirm }) => (
  <TouchableOpacity onPress={onConfirm} className="flex-row items-center justify-between bg-white rounded-full px-2 py-2 border border-neutral-200">
    <TouchableOpacity  className="px-8 py-3 rounded-full">
      <Text className="font-semibold text-3xl">Confirmer</Text>
    </TouchableOpacity>

    <TouchableOpacity className="bg-primary w-28 h-16 rounded-full items-center justify-center">
      <Ionicons name="pricetag" size={20} color={"white"}/>
    </TouchableOpacity>
  </TouchableOpacity>
);

/* =====================
   Main Screen
===================== */

export default function OfferDetailScreen() {
  const [quantity, setQuantity] = useState<number>(50);
  const [price, setPrice] = useState<number>(0);

  return (
    <View className="flex-1 bg-white justify-between px-6 pt-12">
      {/* Header */}
      <FadeSlide>
        <View className="flex-row items-center justify-between">
          <Text className="text-5xl font-semibold">Vanille</Text>
          <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow">
            <Text className="text-lg">×</Text>
          </TouchableOpacity>
        </View>
      </FadeSlide>

      {/* Subtitle */}
      <FadeSlide delay={100}>
        <Text className="text-neutral-500 mt-2 text-xl">Faire Une Offre</Text>
      </FadeSlide>

      {/* Image */}
      <FadeSlide delay={200}>
        <Image
          source={require("../../assets/images/vanille.png")}
          className="w-full h-64 my-10"
          resizeMode="contain"
        />
      </FadeSlide>

      {/* Origin */}
      <FadeSlide delay={300}>
        <Text className="text-center text-neutral-400 text-lg">De Morondava</Text>
      </FadeSlide>

      {/* Quantity */}
      <FadeSlide delay={400}>
        <QuantitySelector
          value={quantity}
          
        />
      </FadeSlide>

      {/* Price */}
      <FadeSlide delay={500}>
        <PricePill price={price}
            onIncrease={() => setPrice(price + 10000)}
            onDecrease={() => price > 10000 && setPrice(price - 10000)}
        />
      </FadeSlide>

      {/* Bottom */}
      <FadeSlide delay={600}>
        <View className="mt-10 mb-6">
          <BottomBar onConfirm={() => {}} />
        </View>
      </FadeSlide>
    </View>
  );
}
