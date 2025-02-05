import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('authToken');
  });
  const [storedOtp, setStoredOtp] = useState('');

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
    if (!value) {
      localStorage.removeItem('authToken');
    }
  };

  useEffect(() => {
    const handleStorage = () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

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
  