import { LocationWithAddress } from "./location.types";
import { OfferType, QualityType } from "./offer.types";
import { Coordinate } from "./parcel.types";
import { TaskType } from "./task.types";

export interface OfferFormData {
    type: OfferType;
    productName: string;
    category: string;
    description: string;
    quantity: number;
    unit: string;
    pricePerUnit: number;
    currency: string;
    negotiable: boolean;
    location: LocationWithAddress;
    images: string[];
    availableFrom: Date;
    availableUntil?: Date;
    quality?: QualityType;
    deliveryAvailable?: boolean;
    minimumOrder?: number;
  }
  
  export interface TaskFormData {
    title: string;
    description?: string;
    type: TaskType;
    parcelId?: string;
    dueDate: Date;
    priority: TaskPriority;
    reminderEnabled: boolean;
    reminderTime?: Date;
    estimatedDuration?: number;
    estimatedCost?: number;
  }
  
  export interface ParcelFormData {
    name: string;
    coordinates: Coordinate[];
    cropType?: string;
    cropVariety?: string;
    plantingDate?: Date;
    expectedHarvestDate?: Date;
    soilType?: string;
    irrigationSystem?: string;
    notes?: string;
  }
  