import { UserType } from "./user.types";

export type OfferType = "sell" | "buy";
export type OfferStatus = "active" | "pending" | "completed" | "cancelled";
export type QualityType = "bio" | "standard" | "premiuim";

export interface Offer {
    id: string;
    userId: string;
    userName: string;
    userPhoto?: string;
    userType: UserType;

    type: OfferType;

    productName: string;
    category: string;
    description: string;
    quantity: number;
    price: number;

    region: string;

    status: OfferStatus;
}

export interface OfferFilters {
    type?: OfferType;
    region?: string;
    minPrice?: number;
    maxPrice?: number;
    productName?: string;
    quantity?: number;
}