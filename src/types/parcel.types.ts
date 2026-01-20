export type ParcelStatus = "active" | "fallow" | "harvested" | "preparation";

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Parcel {
  uuid: string;
  owner_uuid: string;
  
  // Coordonnées géographiques (polygone)
  coordinates: Coordinate[];
  
  // Informations de surface
  area: number; // en m²
  areaUnit: "m2" | "hectare" | "acre";
  
  // Type de culture
  cropType?: string;
  cropVariety?: string;
  
  // Dates
  plantingDate?: Date;
  expectedHarvestDate?: Date;
  lastHarvestDate?: Date;
  
  // Statut
  status: ParcelStatus;
  
  // Sol & Irrigation
  soilType?: string;
  irrigationSystem?: string;
  
  // Notes & Photos
  notes?: string;
  photos?: string[];
  
  // Métadonnées
  createdAt: Date;
  updatedAt: Date;
}

export interface ParcelStats {
  totalArea: number;
  activeParcels: number;
  harvestedThisYear: number;
  upcomingHarvests: number;
}