import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function RegisterScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View className="flex-1 bg-light justify-center px-6">
      <Animated.View
        style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        className="gap-5"
      >
        <View>
          <Image source={require('../../assets/images/logo.png')} className="w-20 h-20 mx-auto mb-4" />
        </View>
        {/* Title */}
        <View className="items-center mb-4">
          <Text className="text-primary text-3xl font-semibold">Créer un compte</Text>
          <Text className="text-neutral-900">Rejoignez-nous et découvrez</Text>
        </View>

        {/* Name */}
        <View className="bg-white rounded-2xl px-4 py-3">
          <TextInput
            placeholder="Nom complet"
            placeholderTextColor="#737373"
            className="text-white text-base"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email */}
        <View className="bg-white rounded-2xl px-4 py-3">
          <TextInput
            placeholder="Email"
            placeholderTextColor="#737373"
            className="text-white text-base"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <View className="bg-white rounded-2xl px-4 py-3">
          <TextInput
            placeholder="Mot de passe"
            placeholderTextColor="#737373"
            className="text-white text-base"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Confirm Password */}
        <View className="bg-white rounded-2xl px-4 py-3">
          <TextInput
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="#737373"
            className="text-white text-base"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity className="bg-primary rounded-2xl py-4 items-center mt-2">
          <Text className="text-white font-semibold text-base">Confirmer</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="items-center mt-4">
          <Text className="text-neutral-900 text-sm">
            Avez-vous déja un compte? <Text className="text-primary">Se connecter</Text>
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}
