// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

type AuthContextType = {
  isSignedIn: boolean;
  user: any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const { isSignedIn, user } = useAuth();

  return (
    <AuthContext.Provider value={{ isSignedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};