// hooks/useAuthToken.ts
import { useState, useEffect } from 'react';

const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Ensure this code only runs in the browser environment
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem("authToken");
      setToken(authToken);  // Set the token in state
    }
  }, []); // Empty dependency array ensures it runs once after component mounts

  return token;  // Return the token
};

export default useAuthToken;
