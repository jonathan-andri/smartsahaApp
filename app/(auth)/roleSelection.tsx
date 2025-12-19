import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function RoleSelectionScreen() {
  return (
    <View className="flex-1 bg-light px-6 pt-14">
      {/* Header */}
      <View className="items-center mb-8">
        <Image
          source={require("../../assets/images/logo.png")} // remplace par ton logo
          className="w-12 h-12 mb-4"
          resizeMode="contain"
        />
        <Text className="text-xl font-medium text-neutral-900">Bienvenu Sur L’application</Text>
        <Text className="text-2xl font-bold text-primary mt-1">Smartsaha</Text>
      </View>

      {/* Question */}
      <Text className="text-center text-lg font-semibold text-neutral-900 mb-6">Êtes Vous</Text>

      {/* Agriculteur Card */}
      <TouchableOpacity activeOpacity={0.9} className="mb-6">
        <View className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <Image
            source={require("../../assets/images/agriculteur.png")} // image agriculteur
            className="w-full h-44"
            resizeMode="cover"
          />
          <View className="absolute bottom-4 left-4 right-4 flex-row items-center justify-between bg-slate-200/80 backdrop-blur-xl rounded-full px-4 py-2">
            <Text className="text-neutral-900 font-semibold">Un Agriculteur</Text>
            <View className="bg-emerald-500 px-5 py-2 rounded-full">
              <Text className="text-white font-semibold">→</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* OU */}
      <Text className="text-center text-neutral-500 mb-6">Ou</Text>

      {/* ONG Card */}
      <TouchableOpacity activeOpacity={0.9}>
        <View className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <Image
            source={require("../../assets/images/ong.png")} // image ONG
            className="w-full h-44"
            resizeMode="cover"
          />
          <View className="absolute bottom-4 left-4 right-4 flex-row items-center justify-between bg-white/90 rounded-full px-4 py-2">
            <Text className="text-neutral-900 font-semibold">Une ONG</Text>
            <View className="bg-emerald-500 px-4 py-2 rounded-full">
              <Text className="text-white font-semibold">👥</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Continue Button */}
      <View className="mt-auto mb-8 items-center">
        <TouchableOpacity className="bg-emerald-500 rounded-full px-10 py-4 shadow-lg">
          <Text className="text-white font-semibold text-base">Continuer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
