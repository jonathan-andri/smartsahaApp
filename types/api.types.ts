import { UserType } from "./user.types";

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T> {
    results: T[];
    count: number;
    next?: string;
    previous?: string;
    page: number;
    totalPages: number;
  }
  
  // Réponse d'authentification Django
  export interface AuthResponse {
    access: string;  // JWT access token
    refresh: string; // JWT refresh token
    user: UserType;
  }
  
  // Requête de connexion
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  // Requête d'inscription
  export interface SignUpRequest {
    email: string;
    password: string;
    displayName: string;
    phoneNumber?: string;
  }
  
  // Erreur API
  export interface ApiError {
    message: string;
    code?: string;
    statusCode?: number;
    details?: Record<string, string[]>;
  }
  