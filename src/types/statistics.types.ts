export interface UserStatistics {
    totalOffers: number;
    activeOffers: number;
    completedTransactions: number;
    averageRating: number;
    responseRate: number;
    joinDate: Date;
  }
  
  export interface OfferStatistics {
    totalViews: number;
    totalInterested: number;
    averageResponseTime: number;
    priceHistory?: {
      date: Date;
      price: number;
    }[];
  }
  