// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { User, UserType } from "../types/user.types";
// import { api, handleApiError } from "./api";

// export interface LoginCredentials {
//   email: string;
//   password: string;
// }

// export interface SignUpData {
//   email: string;
//   password: string;
//   displayName: string;
// }

// export interface AuthResponse {
//   access: string;
//   refresh: string;
//   user: User;
// }

// class AuthService {
//   // Connexion
//   async login(credentials: LoginCredentials): Promise<AuthResponse> {
//     try {
//       const response = await api.post("/auth/login/", credentials);
//       const { access, refresh, user } = response.data;

//       // Sauvegarder les tokens
//       await AsyncStorage.multiSet([
//         ["access_token", access],
//         ["refresh_token", refresh],
//         ["user", JSON.stringify(user)],
//       ]);

//       return response.data;
//     } catch (error) {
//       throw new Error(handleApiError(error));
//     }
//   }

//   // Inscription
//   async register(data: SignUpData): Promise<AuthResponse> {
//     try {
//       const response = await api.post("/auth/register/", data);
//       const { access, refresh, user } = response.data;

//       await AsyncStorage.multiSet([
//         ["access_token", access],
//         ["refresh_token", refresh],
//         ["user", JSON.stringify(user)],
//       ]);

//       return response.data;
//     } catch (error) {
//       throw new Error(handleApiError(error));
//     }
//   }

//   // Déconnexion
//   async signOut(): Promise<void> {
//     try {
//       const refreshToken = await AsyncStorage.getItem("refresh_token");
//       if (refreshToken) {
//         await api.post("/auth/logout/", { refresh: refreshToken });
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       await AsyncStorage.multiRemove(["access_token", "refresh_token", "user"]);
//     }
//   }

//   // Récupérer l'utilisateur actuel
//   async getCurrentUser(): Promise<User | null> {
//     try {
//       const userStr = await AsyncStorage.getItem("user");
//       if (userStr) {
//         return JSON.parse(userStr);
//       }

//       // Si pas en cache, récupérer depuis l'API
//       const response = await api.get("/auth/me/");
//       await AsyncStorage.setItem("user", JSON.stringify(response.data));
//       return response.data;
//     } catch (error) {
//       return null;
//     }
//   }

//   // Mettre à jour le type d'utilisateur
//   async updateUserType(userType: UserType): Promise<User> {
//     try {
//       const response = await api.patch("/auth/me/", { userType });
//       await AsyncStorage.setItem("user", JSON.stringify(response.data));
//       return response.data;
//     } catch (error) {
//       throw new Error(handleApiError(error));
//     }
//   }

//   // Réinitialiser mot de passe
//   async resetPassword(email: string): Promise<void> {
//     try {
//       await api.post("/auth/password-reset/", { email });
//     } catch (error) {
//       throw new Error(handleApiError(error));
//     }
//   }

//   // Vérifier si l'utilisateur est connecté
//   async isAuthenticated(): Promise<boolean> {
//     const token = await AsyncStorage.getItem("access_token");
//     return !!token;
//   }
// }

// export default new AuthService();

import { httpClient } from '../../src/api/client';
import { API_ENDPOINTS } from '../../src/api/endpoints';

export const authService = {
  register: async (payload: {
    username: string;
    email: string;
    password: string;
    justificatif_url: string;
    id_categorie_user_id: number;
  }) => {
    const { data } = await httpClient.post(
      API_ENDPOINTS.REGISTER,
      payload
    );
    return data;
  },

  fetchCategories: async () => {
    const { data } = await httpClient.get(API_ENDPOINTS.CATEGORIES);
    return data;
  },
};
