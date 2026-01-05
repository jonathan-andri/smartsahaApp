import { colorSelect } from "@/components/colorSelector";
import { Item } from "@/components/types/Item";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { formatNumberShort } from '../../components/formatNumberShort';
/* =====================
   Reusable Components
===================== */

const handleItemPress = (item: Item) => {
  router.push({
    pathname: "/makeOffer",
    params: { item: JSON.stringify(item) },
  });
};

// Update the AnimatedCard component to use handleItemPress
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
      className={`flex-1 rounded-3xl p-4 m-2 ${colorSelect(item.title)}`}
    > 
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <Text className="text-neutral-900 font-semibold text-base">{item.title}</Text>
        <Text className="text-neutral-500 text-xs mb-2">{item.stock} KG</Text>
        <Image source={item.image} className="w-full h-24" resizeMode="contain" />
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

interface SectionHeaderProps {
  data: {
    "id": string,
    "title": string,
    "stock": string,
    "price": string,
    "bg": string,
    "image": any,
  };
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({data, isVisible, setIsVisible}) => {
  return (
  <View className="flex-row items-center justify-between mb-4">
    <View>
      <Text className="text-emerald-500 font-semibold">Offres</Text>
      <Text className="text-2xl font-bold">Pour Vous</Text>
    </View>
    <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow"
    onPress={ () => setIsVisible(!isVisible)} 
    >
      <Text className="text-lg"><Ionicons name="filter" size={22} /></Text>
    </TouchableOpacity>
   { isVisible && (<Animated.View
    className="absolute self-baseline top-14 left-[65%] bg-white shadow-slate-900 z-50 p-3 rounded-lg"
     >
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View className="p-2 border-b-2 border-b-slate-100 ">
              <Text className="text-lg">{item.title}</Text>
            </View>
          )}
        />
      </Animated.View>) }
  </View>
);
}

const CartBar = () => (
  <View className="absolute bottom-6 left-6 right-6 bg-emerald-500 rounded-full px-6 py-4 flex-row items-center justify-between shadow-xl">
    <View>
      <Text className="text-white font-semibold">Panier</Text>
      <Text className="text-white/80 text-xs">3 Offres</Text>
    </View>
    <View className="flex-row items-center gap-2">
      <View className="w-8 h-8 bg-white rounded-full" ><Image className="w-full h-24" resizeMode="contain" /></View>
      <View className="w-8 h-8 bg-white rounded-full" />
      <View className="w-8 h-8 bg-white rounded-full" />
    </View>
  </View>
);

/* =====================
   Main Screen
===================== */

export default function OffersScreen() {
  const [isDropMenuVisible, setIsDropMenuVisible] = React.useState(false);
  const data = [
    {
      id: "1",
      title: "Vanille",
      stock: 120,
      price: 4500000,
      bg: "bg-yellow-100",
      image: require("../../assets/images/vanille.png"),
    },
    {
      id: "2",
      title: "Maïs",
      stock: 2000,
      price: 30000000,
      bg: "bg-orange-100",
      image: require("../../assets/images/mais.png"),
    },
    {
      id: "3",
      title: "Blé",
      stock: 1000,
      price: 40000000,
      bg: "bg-amber-100",
      image: require("../../assets/images/ble.png"),
    },
    {
      id: "4",
      title: "Noix de cacao",
      stock: 500,
      price: 350000,
      bg: "bg-purple-100",
      image: require("../../assets/images/cacao.png"),
    },
    {
      id: "5",
      title: "Fraise",
      stock: 200,
      price: 500000,
      bg: "bg-red-100",
      image: require("../../assets/images/fraise.png"),
    },
    {
      id: "6",
      title: "Raisin",
      stock: 300,
      price: 480000,
      bg: "bg-indigo-100",
      image: require("../../assets/images/raisin.png"),
    },
    {
        id: "7",
        title: "Vanille",
        stock: 120,
        price: 4500,
        bg: "bg-yellow-100",
        image: require("../../assets/images/vanille.png"),
      },
      {
        id: "8",
        title: "Maïs",
        stock: 2,
        price: 3000,
        bg: "bg-orange-100",
        image: require("../../assets/images/mais.png"),
      },
      {
        id: "9",
        title: "Blé",
        stock: 1,
        price: 40000,
        bg: "bg-amber-100",
        image: require("../../assets/images/ble.png"),
      },
      {
        id: "10",
        title: "Noix de cacao",
        stock: 500,
        price: 350000,
        bg: "bg-purple-100",
        image: require("../../assets/images/cacao.png"),
      },
      {
        id: "11",
        title: "Fraise",
        stock: 200,
        price: 500000000,
        bg: "bg-red-100",
        image: require("../../assets/images/fraise.png"),
      },
      {
        id: "12",
        title: "Raisin",
        stock: 300,
        price: 4800,
        bg: "bg-indigo-100",
        image: require("../../assets/images/raisin.png"),
      },
  ];

  return (
    <View className="flex-1 bg-[#F6FBF8] px-4 pt-12">
      <SectionHeader data={data} isVisible={isDropMenuVisible} setIsVisible={setIsDropMenuVisible}/>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item, index }) => (
                <AnimatedCard item={item} index={index}/>
          )}
        />
      <CartBar />
    </View>
  );
}
