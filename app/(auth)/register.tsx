// import React, { useEffect, useRef, useState } from "react";
// import { Animated, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { useAuth } from "../../src/hooks/useAuth";


// export default function RegisterScreen() {
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(30)).current;

//   const { register } = useAuth();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 700,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 700,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   return (
//     <View className="flex-1 bg-light justify-center px-6">
//       <Animated.View
//         style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
//         className="gap-5"
//       >
//         <View>
//           <Image source={require('../../assets/images/logo.png')} className="w-20 h-20 mx-auto mb-4" />
//         </View>
//         {/* Title */}
//         <View className="items-center mb-4">
//           <Text className="text-primary text-3xl font-semibold">Créer un compte</Text>
//           <Text className="text-neutral-900">Rejoignez-nous et découvrez</Text>
//         </View>

//         {/* Name */}
//         <View className="bg-white rounded-2xl px-4 py-3">
//           <TextInput
//             placeholder="Nom complet"
//             placeholderTextColor="#737373"
//             className="text-white text-base"
//             value={name}
//             onChangeText={setName}
//           />
//         </View>

//         {/* Email */}
//         <View className="bg-white rounded-2xl px-4 py-3">
//           <TextInput
//             placeholder="Email"
//             placeholderTextColor="#737373"
//             className="text-white text-base"
//             value={email}
//             onChangeText={setEmail}
//             autoCapitalize="none"
//           />
//         </View>

//         {/* Password */}
//         <View className="bg-white rounded-2xl px-4 py-3">
//           <TextInput
//             placeholder="Mot de passe"
//             placeholderTextColor="#737373"
//             className="text-white text-base"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />
//         </View>

//         {/* Confirm Password */}
//         <View className="bg-white rounded-2xl px-4 py-3">
//           <TextInput
//             placeholder="Confirmer le mot de passe"
//             placeholderTextColor="#737373"
//             className="text-white text-base"
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//             secureTextEntry
//           />
//         </View>

//         {/* Register Button */}
//         <TouchableOpacity className="bg-primary rounded-2xl py-4 items-center mt-2"
//           onPress={() => register(email, password)}
//         >
//           <Text className="text-white font-semibold text-base">Confirmer</Text>
//         </TouchableOpacity>

//         {/* Footer */}
//         <View className="items-center mt-4">
//           <Text className="text-neutral-900 text-sm">
//             Avez-vous déja un compte? <Text className="text-primary">Se connecter</Text>
//           </Text>
//         </View>
//       </Animated.View>
//     </View>
//   );
// }
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import { authService } from '../../src/services/auth.service';
import { CategoryUser } from '../../src/types/auth.types';

export default function RegisterScreen() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    justification: '',
  });

  const [categories, setCategories] = useState<CategoryUser[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // 🔹 Load categories (same logic as web)
  useEffect(() => {
    (async () => {
      const data = await authService.fetchCategories();

      const filtered = data
        .filter((cat: any) => cat.categorie.toLowerCase() !== 'admin')
        .map((cat: any) => ({
          ...cat,
          displayName:
            cat.categorie.toLowerCase() === 'user'
              ? 'Both'
              : cat.categorie,
        }));

      setCategories(filtered);
    })();
  }, []);

  const submit = async () => {
    if (!selectedCategory) {
      setMessage('Please select a category.');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await authService.register({
        username: form.username,
        email: form.email,
        password: form.password,
        justificatif_url: form.justification,
        id_categorie_user_id: selectedCategory,
      });

      setMessage(
        'Account created successfully. Please wait for admin validation.'
      );

      setTimeout(() => {
        router.replace('/(auth)/login');
      }, 4000);
    } catch (err: any) {
      setMessage(
        err?.response?.data?.detail ||
          'Network or server error. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#112830] px-6 justify-center">
      <Text className="text-3xl font-bold text-white text-center mb-8">
        Create Account
      </Text>

      {/* Username & Email */}
      <View className="flex-row gap-3 mb-4">
        <TextInput
          placeholder="Username"
          placeholderTextColor="#9ca3af"
          className="flex-1 bg-[#1D333B] text-white px-4 py-3 rounded"
          onChangeText={(v) => setForm({ ...form, username: v })}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          className="flex-1 bg-[#1D333B] text-white px-4 py-3 rounded"
          onChangeText={(v) => setForm({ ...form, email: v })}
        />
      </View>

      {/* Password & Justification */}
      <View className="flex-row gap-3 mb-4">
        <TextInput
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          className="flex-1 bg-[#1D333B] text-white px-4 py-3 rounded"
          onChangeText={(v) => setForm({ ...form, password: v })}
        />
        <TextInput
          placeholder="Justification link"
          placeholderTextColor="#9ca3af"
          className="flex-1 bg-[#1D333B] text-white px-4 py-3 rounded"
          onChangeText={(v) => setForm({ ...form, justification: v })}
        />
      </View>

      {/* Categories */}
      <Text className="text-gray-300 mb-2">Choose your category</Text>
      <View className="flex-row flex-wrap gap-3 mb-6">
        {categories.map((cat) => (
          <Pressable
            key={cat.id}
            onPress={() => setSelectedCategory(cat.id)}
            className={`px-4 py-3 rounded border ${
              selectedCategory === cat.id
                ? 'border-emerald-500 bg-emerald-500/20'
                : 'border-white/20 bg-[#1D333B]'
            }`}
          >
            <Text className="text-white text-sm font-medium">
              {cat.displayName}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Message */}
      {message && (
        <Text className="text-center text-sm text-gray-300 mb-4">
          {message}
        </Text>
      )}

      {/* Submit */}
      <Pressable
        disabled={loading}
        onPress={submit}
        className="bg-emerald-500 py-4 rounded items-center"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold">Sign Up</Text>
        )}
      </Pressable>
    </View>
  );
}
