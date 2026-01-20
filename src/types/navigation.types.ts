import { NavigatorScreenParams } from "@react-navigation/native";
import { UserType } from "./user.types";

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  UserTypeSelection: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Offers: undefined;
  CreateOffer: undefined;
  Chat: NavigatorScreenParams<ChatStackParamList>;
  Parcels: undefined;
  Tasks: undefined;
  Profile: undefined;
};

export type ChatStackParamList = {
  ChatList: undefined;
  ChatRoom: { 
    conversationId: string; 
    otherUser: { 
      id: string; 
      name: string; 
      photo?: string;
      userType: UserType;
    };
  };
};

export type OfferStackParamList = {
  OffersList: undefined;
  OfferDetails: { offerId: string };
  CreateOffer: undefined;
  EditOffer: { offerId: string };
};

export type ParcelStackParamList = {
  ParcelsList: undefined;
  ParcelDetails: { parcelId: string };
  CreateParcel: undefined;
  EditParcel: { parcelId: string };
};

export type TaskStackParamList = {
  TasksList: undefined;
  TaskDetails: { taskId: string };
  CreateTask: undefined;
  EditTask: { taskId: string };
};