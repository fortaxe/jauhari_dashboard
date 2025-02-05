import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    storedOtp: string;
    setStoredOtp: (otp: string) => void;
  }
  
  const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setAuthenticated: () => {},
    storedOtp: '',
    setStoredOtp: () => {}
  });
  
  export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [storedOtp, setStoredOtp] = useState('');
  
    return (
      <AuthContext.Provider value={{
        isAuthenticated,
        setAuthenticated,
        storedOtp,
        setStoredOtp
      }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => useContext(AuthContext);
  