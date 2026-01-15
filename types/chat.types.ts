import {
    UserType
} from "./user.types";

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    senderName: string;
    senderPhoto?: string;
    text: string;
    imageUrl?: string;
    timestamp: Date;
    read: boolean;
    
    // Métadonnées
    edited?: boolean;
    editedAt?: Date;
    deleted?: boolean;
  }

  export interface Conversation {
    id: string;
    participants: string[]; // IDs des utilisateurs
    participantsData: {
      id: string;
      name: string;
      photo?: string;
      userType: UserType;
    }[];
    lastMessage?: Message;
    offerId?: string; // Lié à une offre spécifique
    offerData?: {
      productName: string;
      price: number;
      quantity: number;
    };
    unreadCount: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface TypingIndicator {
    userId: string;
    conversationId: string;
    isTyping: boolean;
    timestamp: Date;
  }