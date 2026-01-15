import {
    API_BASE_URL_DEV,
    API_BASE_URL_PROD,
    GOOGLE_MAPS_API_KEY,
    SUPABASE_ANON_KEY,
    SUPABASE_URL,
} from "@env";
  
  interface EnvConfig {
    apiUrl: string;
    supabaseUrl: string;
    supabaseAnonKey: string;
    googleMapsApiKey: string;
  }
  
  const ENV: Record<'dev' | 'prod', EnvConfig> = {
    dev: {
      apiUrl: API_BASE_URL_DEV || "http://10.0.2.2:8000/api",
      supabaseUrl: SUPABASE_URL,
      supabaseAnonKey: SUPABASE_ANON_KEY,
      googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    },
    prod: {
      apiUrl: API_BASE_URL_PROD || "https://api.production.com",
      supabaseUrl: SUPABASE_URL,
      supabaseAnonKey: SUPABASE_ANON_KEY,
      googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    },
  };
  
  const getEnvVars = (): EnvConfig => {
    return __DEV__ ? ENV.dev : ENV.prod;
  };
  
  export default getEnvVars();