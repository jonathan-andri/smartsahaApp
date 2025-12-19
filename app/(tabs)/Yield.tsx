import React, { useEffect, useRef } from "react";
import { Animated, FlatList, Image, Text, TouchableOpacity, View } from "react-native";


/* =====================
   Reusable Components
===================== */

const AnimatedCard = ({ item, index }) => {
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

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
      className={`flex-1 rounded-3xl p-4 m-2 ${item.bg}`}
    >
      <Text className="text-neutral-900 font-semibold text-base">{item.title}</Text>
      <Text className="text-neutral-500 text-xs mb-2">{item.stock}</Text>

      <Image source={item.image} className="w-full h-24" resizeMode="contain" />

      <View className="flex-row items-center justify-between mt-3">
        <Text className="text-sm font-semibold text-neutral-900">{item.price}</Text>
        <TouchableOpacity className="bg-emerald-500 w-8 h-8 rounded-full items-center justify-center">
          <Text className="text-white font-bold">+</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const SectionHeader = () => (
  <View className="flex-row items-center justify-between mb-4">
    <View>
      <Text className="text-emerald-500 font-semibold">Offres</Text>
      <Text className="text-2xl font-bold">Pour Vous</Text>
    </View>
    <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow">
      <Text className="text-lg">←</Text>
    </TouchableOpacity>
  </View>
);

const CartBar = () => (
  <View className="absolute bottom-6 left-6 right-6 bg-emerald-500 rounded-full px-6 py-4 flex-row items-center justify-between shadow-xl">
    <View>
      <Text className="text-white font-semibold">Panier</Text>
      <Text className="text-white/80 text-xs">3 Offres</Text>
    </View>
    <View className="flex-row items-center gap-2">
      <View className="w-8 h-8 bg-white rounded-full" />
      <View className="w-8 h-8 bg-white rounded-full" />
      <View className="w-8 h-8 bg-white rounded-full" />
    </View>
  </View>
);

/* =====================
   Main Screen
===================== */

export default function OffersScreen() {
  const data = [
    {
      id: "1",
      title: "Vanille",
      stock: "120kg",
      price: "Ar 45k",
      bg: "bg-yellow-100",
      image: require("../../assets/images/vanille.png"),
    },
    {
      id: "2",
      title: "Maïs",
      stock: "2 tonnes",
      price: "Ar 30k",
      bg: "bg-orange-100",
      image: require("../../assets/images/mais.png"),
    },
    {
      id: "3",
      title: "Blé",
      stock: "1 tonne",
      price: "Ar 40k",
      bg: "bg-amber-100",
      image: require("../../assets/images/ble.png"),
    },
    {
      id: "4",
      title: "Noix de cacao",
      stock: "500kg",
      price: "Ar 35k",
      bg: "bg-purple-100",
      image: require("../../assets/images/cacao.png"),
    },
    {
      id: "5",
      title: "Fraise",
      stock: "200kg",
      price: "Ar 50k",
      bg: "bg-red-100",
      image: require("../../assets/images/fraise.png"),
    },
    {
      id: "6",
      title: "Raisin",
      stock: "300kg",
      price: "Ar 48k",
      bg: "bg-indigo-100",
      image: require("../../assets/images/raisin.png"),
    },
  ];

  return (
    <View className="flex-1 bg-[#F6FBF8] px-4 pt-12">
      <SectionHeader />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item, index }) => (
          <AnimatedCard item={item} index={index} />
        )}
      />

      <CartBar />
    </View>
  );
}
