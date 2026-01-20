// contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import authService from "../services/auth.service";
import { User, UserType } from "../types/user.types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, displayName: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateUserType: (userType: UserType) => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Charger l'utilisateur au démarrage
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const authenticated = await authService.isAuthenticated();
      if (authenticated) {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error loading user:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Rafraîchir les données utilisateur
  const refreshUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Error refreshing user:", error);
    }
  };

  // Connexion
  const signIn = async (email: string, password: string) => {
    try {
      const response = await authService.signIn({ email, password });
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Inscription
  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const response = await authService.signUp({ email, password, displayName });
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Déconnexion
  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Mettre à jour le type d'utilisateur
  const updateUserType = async (userType: UserType) => {
    try {
      const updatedUser = await authService.updateUserType(userType);
      setUser(updatedUser);
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
    }
  };

  // Réinitialiser le mot de passe
  const resetPassword = async (email: string) => {
    try {
      await authService.resetPassword(email);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        signIn,
        signUp,
        signOut,
        updateUserType,
        resetPassword,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};