// import React from "react";
// import { Image, Text, TouchableOpacity, View } from "react-native";

// export default function RoleSelectionScreen() {
//   return (
//     <View className="flex-1 bg-light px-6 pt-14">
//       {/* Header */}
//       <View className="items-center mb-8">
//         <Image
//           source={require("../../../assets/images/logo.png")} // remplace par ton logo
//           className="w-12 h-12 mb-4"
//           resizeMode="contain"
//         />
//         <Text className="text-xl font-medium text-neutral-900">Bienvenu Sur L’application</Text>
//         <Text className="text-2xl font-bold text-primary mt-1">Smartsaha</Text>
//       </View>

//       {/* Question */}
//       <Text className="text-center text-lg font-semibold text-neutral-900 mb-6">Êtes Vous</Text>

//       {/* Agriculteur Card */}
//       <TouchableOpacity activeOpacity={0.9} className="mb-6">
//         <View className="bg-white rounded-3xl shadow-lg overflow-hidden">
//           <Image
//             source={require("../../../assets/images/agriculteur.png")} // image agriculteur
//             className="w-full h-44"
//             resizeMode="cover"
//           />
//           <View className="absolute bottom-4 left-4 right-4 flex-row items-center justify-between bg-slate-200/80 backdrop-blur-xl rounded-full px-4 py-2">
//             <Text className="text-neutral-900 font-semibold">Un Agriculteur</Text>
//             <View className="bg-emerald-500 px-5 py-2 rounded-full">
//               <Text className="text-white font-semibold">→</Text>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>

//       {/* OU */}
//       <Text className="text-center text-neutral-500 mb-6">Ou</Text>

//       {/* ONG Card */}
//       <TouchableOpacity activeOpacity={0.9}>
//         <View className="bg-white rounded-3xl shadow-lg overflow-hidden">
//           <Image
//             source={require("../../../assets/images/ong.png")} // image ONG
//             className="w-full h-44"
//             resizeMode="cover"
//           />
//           <View className="absolute bottom-4 left-4 right-4 flex-row items-center justify-between bg-white/90 rounded-full px-4 py-2">
//             <Text className="text-neutral-900 font-semibold">Une ONG</Text>
//             <View className="bg-emerald-500 px-4 py-2 rounded-full">
//               <Text className="text-white font-semibold">👥</Text>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>

//       {/* Continue Button */}
//       <View className="mt-auto mb-8 items-center">
//         <TouchableOpacity className="bg-emerald-500 rounded-full px-10 py-4 shadow-lg">
//           <Text className="text-white font-semibold text-base">Continuer</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

import { UserRole } from "@/src/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
// Type pour le rôle


// Clés de stockage
const STORAGE_KEYS = {
  FIRST_LAUNCH: 'hasLaunchedBefore',
  USER_ROLE: 'selectedRole',
  USER_TOKEN: 'userToken',
  HAS_ACCOUNT: 'hasAccount', // Pour savoir si l'utilisateur a déjà un compte
};

export default function RoleSelectionScreen() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [hasAccount, setHasAccount] = useState(false);

  // Vérifier si l'utilisateur a déjà un compte au démarrage
  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      // Vérifier si l'utilisateur a un token (déjà connecté)
      const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
      
      if (token) {
        // Si déjà connecté, rediriger directement vers le dashboard
        router.replace('/(tabs)');
        return;
      }

      // Vérifier s'il a déjà un compte enregistré
      const savedHasAccount = await AsyncStorage.getItem(STORAGE_KEYS.HAS_ACCOUNT);
      const savedRole = await AsyncStorage.getItem(STORAGE_KEYS.USER_ROLE);

      if (savedHasAccount === 'true') {
        setHasAccount(true);
      }

      if (savedRole) {
        setSelectedRole(savedRole as UserRole);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleRoleSelection = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleContinue = async () => {
    if (!selectedRole) {
      Alert.alert(
        "Sélection requise",
        "Veuillez sélectionner votre rôle avant de continuer."
      );
      return;
    }

    try {
      // Sauvegarder le rôle sélectionné
      await AsyncStorage.setItem(STORAGE_KEYS.USER_ROLE, selectedRole);
      
      // Marquer le premier lancement
      await AsyncStorage.setItem(STORAGE_KEYS.FIRST_LAUNCH, 'true');

      // Redirection selon si l'utilisateur a un compte ou non
      if (hasAccount) {
        // Rediriger vers le login
        router.push({
          pathname: '/(auth)/login',
          params: { role: selectedRole }
        });
      } else {
        // Rediriger vers l'inscription
        router.push({
          pathname: "/(auth)/register",
          params: { role: selectedRole }
        });
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      Alert.alert("Erreur", "Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const handleSwitchAuthMode = () => {
    if (!selectedRole) {
      Alert.alert(
        "Rôle requis",
        "Veuillez d'abord sélectionner votre rôle."
      );
      return;
    }

    if (hasAccount) {
      // L'utilisateur dit qu'il n'a PAS de compte, aller à l'inscription
      router.push({
        pathname: '/(auth)/register',
        params: { role: selectedRole }
      });
    } else {
      // L'utilisateur dit qu'il a un compte, aller au login
      router.push({
        pathname: '/(auth)/login',
        params: { role: selectedRole }
      });
    }
  };

  // Afficher un loader pendant la vérification
  if (isCheckingAuth) {
    return (
      <View className="flex-1 bg-light justify-center items-center">
        <StatusBar style="auto" />
        <ActivityIndicator size="large" color="#10B481" />
        <Text className="text-neutral-900 mt-4 text-base">Chargement...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-light px-6 pt-14">
      <StatusBar style="auto" />
      
      {/* Header */}
      <View className="items-center mb-8">
        <Image
          source={require("../../assets/images/logo.png")}
          className="w-12 h-12 mb-4"
          resizeMode="contain"
        />
        <Text className="text-xl font-medium text-neutral-900">Bienvenu Sur L&apos; application</Text>
        <Text className="text-2xl font-bold text-primary mt-1">Smartsaha</Text>
      </View>

      {/* Question */}
      <Text className="text-center text-lg font-semibold text-neutral-900 mb-6">
        Êtes Vous
      </Text>

      {/* Agriculteur Card */}
      <TouchableOpacity 
        activeOpacity={0.9} 
        className="mb-6"
        onPress={() => handleRoleSelection('agriculteur')}
      >
        <View className={`
          bg-white rounded-3xl shadow-lg overflow-hidden
          ${selectedRole === 'agriculteur' ? 'border-2 border-emerald-500' : 'border-0'}
        `}>
          <Image
            source={require("../../assets/images/agriculteur.png")}
            className="w-full h-44"
            resizeMode="cover"
          />
          <View className="absolute bottom-4 left-4 right-4 flex-row items-center justify-between bg-slate-200/80 backdrop-blur-xl rounded-full px-4 py-2">
            <Text className="text-neutral-900 font-semibold">Un Agriculteur</Text>
            <View className={`
              px-5 py-2 rounded-full
              ${selectedRole === 'agriculteur' ? 'bg-emerald-600' : 'bg-emerald-500'}
            `}>
              <Text className="text-white font-semibold">→</Text>
            </View>
          </View>
          
          {selectedRole === 'agriculteur' && (
            <View className="absolute top-3 right-3 bg-emerald-500 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-semibold">✓ Sélectionné</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* OU */}
      <Text className="text-center text-neutral-500 mb-6">Ou</Text>

      {/* ONG Card */}
      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={() => handleRoleSelection('ong')}
      >
        <View className={`
          bg-white rounded-3xl shadow-lg overflow-hidden
          ${selectedRole === 'ong' ? 'border-2 border-emerald-500' : 'border-0'}
        `}>
          <Image
            source={require("../../assets/images/ong.png")}
            className="w-full h-44"
            resizeMode="cover"
          />
          <View className="absolute bottom-4 left-4 right-4 flex-row items-center justify-between bg-white/90 rounded-full px-4 py-2">
            <Text className="text-neutral-900 font-semibold">Une ONG</Text>
            <View className={`
              px-4 py-2 rounded-full
              ${selectedRole === 'ong' ? 'bg-emerald-600' : 'bg-emerald-500'}
            `}>
              <Text className="text-white font-semibold">👥</Text>
            </View>
          </View>
          
          {selectedRole === 'ong' && (
            <View className="absolute top-3 right-3 bg-emerald-500 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-semibold">✓ Sélectionné</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Bouton pour changer de mode (inscription/connexion) */}
      {selectedRole && (
        <TouchableOpacity 
          className="mt-6"
          onPress={handleSwitchAuthMode}
        >
          <Text className="text-center text-primary font-medium">
            {hasAccount 
              ? "Vous n'avez pas de compte ? S'inscrire" 
              : "Vous avez déjà un compte ? Se connecter"
            }
          </Text>
        </TouchableOpacity>
      )}

      {/* Continue Button */}
      <View className="mt-4 mb-8 items-center">
        <TouchableOpacity 
          className={`
            rounded-full px-10 py-4 shadow-lg
            ${selectedRole ? 'bg-emerald-500' : 'bg-emerald-300'}
          `}
          onPress={handleContinue}
          disabled={!selectedRole}
        >
          <Text className="text-white font-semibold text-base">
            {hasAccount ? "Se connecter" : "Continuer"}
          </Text>
        </TouchableOpacity>
        
        {/* Indicateur du mode actuel */}
        {selectedRole && (
          <Text className="text-neutral-500 text-sm mt-2">
            {hasAccount 
              ? "Mode : Connexion (vous avez indiqué avoir un compte)" 
              : "Mode : Inscription (nouvel utilisateur)"
            }
          </Text>
        )}
      </View>
    </View>
  );
}
