import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, TextInput, TouchableOpacity, View } from "react-native";

// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId: 'YOUR_WEB_CLIENT_ID', // Replace with your web client ID
// });

// const handleGoogleSignIn = async () => {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     console.log(userInfo);
//     // Handle successful login here (e.g., navigate to another screen or store user info)
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Add a button for Google Sign-In
// <TouchableOpacity onPress={handleGoogleSignIn} className="bg-red-500 rounded-2xl py-4 items-center">
//   <Text className="text-white font-semibold text-base">Se connecter avec Google</Text>
// </TouchableOpacity>

export default function LoginScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        className="gap-6"
      >
        {/* Title */}
        <View className="items-center mb-6">
          <Text className="text-primary text-3xl font-semibold">Bienvenue à nouveau</Text>
          <Text className="mt-1">Connetez-vous pour continuer</Text>
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

        {/* Login Button */}
        <TouchableOpacity className="bg-primary rounded-2xl py-4 items-center">
          <Text className="text-white font-semibold text-base">Se connecter</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="items-center mt-4">
          <Text className="text-neutral-500 text-sm">
            Pas encore de compte ?<Text className="text-primary">Sign up</Text>
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}
