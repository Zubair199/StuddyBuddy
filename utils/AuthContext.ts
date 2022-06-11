import {createContext} from 'react';

type AuthContextType = {
  userToken: string;
  setUserToken: (value: string) => void;
  userName: string;
  setUserName: (value: string) => void;
  userEmail: string;
  setUserEmail: (value: string) => void;
  userType: string;
  setUserType: (value: string) => void;
  guestView: boolean;
  setGuestView: (value: boolean) => void;
  currentScreen: string;
  setCurrentScreen: (value: string) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
