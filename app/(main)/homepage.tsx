import { CropCard } from "@/components/cards/cropCard";
import type { SectionHeaderProps } from "@/components/type/types";
import { CartBar } from "@/components/ui/cartBar";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Animated, FlatList, Text, TouchableOpacity, View } from "react-native";

type cropType = "Vanille" | "Maïs" | "Blé" | "Noix de cacao" | "Fraise" | "Raisin";
let filter : cropType;
const filterOptions: cropType[] = ["Vanille", "Maïs", "Blé", "Noix de cacao", "Fraise", "Raisin"]; 

const SectionHeader: React.FC<SectionHeaderProps> = ({data, isVisible, setIsVisible, setFilter}) => {
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
          data={filterOptions}
          // keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View className="p-2 border-b-2 border-b-slate-100 ">
              <Text className="text-lg">{item}</Text>
            </View>
          )}
        />
      </Animated.View>) }
  </View>
);
}
/* =====================
   Main Screen
===================== */

export default function OffersScreen() {
  const [isDropMenuVisible, setIsDropMenuVisible] = React.useState(false);
  const [filter , setFilter] = React.useState<string | null>(null);

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
      <SectionHeader data={data} isVisible={isDropMenuVisible} setIsVisible={setIsDropMenuVisible} setFilter={setFilter}/>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item, index }) => (
                <CropCard item={item} index={index}/>
          )}
        />
      <CartBar />
    </View>
  );
}
