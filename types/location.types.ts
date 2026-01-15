export interface Location {
    latitude: number;
    longitude: number;
  }
  
  export interface Address {
    street?: string;
    city: string;
    region: string;
    postalCode?: string;
    country: string;
  }
  
  export interface LocationWithAddress extends Location {
    address: Address;
    formattedAddress: string;
  }
  