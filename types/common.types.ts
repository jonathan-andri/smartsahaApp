export interface SelectOption<T = string> {
    label: string;
    value: T;
    icon?: string;
    color?: string;
    disabled?: boolean;
  }
  
  export interface TimeRange {
    start: Date;
    end: Date;
  }
  
  export interface GeoLocation {
    latitude: number;
    longitude: number;
    accuracy?: number;
    altitude?: number;
    heading?: number;
    speed?: number;
  }
  
  export type LoadingState = "idle" | "loading" | "success" | "error";
  
  export interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
  }