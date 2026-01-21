export type UserType = "farmer" | "buyer";

export interface User {
    uuid: string;
    email: string;
    username: string;
    password: string;
    userType?: UserType;
    createdAt: Date;
    updatedAt: Date;

    //localistion
    location?: {
        latitude: number;
        longitude: number;
        address: string;
        region?: string;
    };

    //specifique agriculteurs
    parcelName?: string[];
    farmsize?: number[];

    //spec acheteur
    companyName?: string;
    businessType?: string;

    //statistiques & verifiaction
    rating?: number;
    totalTransaction?: number;
    verified?: boolean;

    bio?: string;
}

export type UserRole = 'agriculteur' | 'ong' | null;
