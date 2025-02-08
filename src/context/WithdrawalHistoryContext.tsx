import { createContext, useContext, useState, ReactNode } from "react";

const WithdrawalSearchContext = createContext<{
    searchTerm: string;
    setSearchTerm: (term: string) => void;
  }>({
    searchTerm: "",
    setSearchTerm: () => {},
  });


  // Provider component
export const WithdrawalSearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState("");
  
    console.log(searchTerm, "searchTerm");
    return (
      <WithdrawalSearchContext.Provider value={{ searchTerm, setSearchTerm }}>
        {children}
      </WithdrawalSearchContext.Provider>
    );
  };
  
  // Custom hook to use Transaction search
  export const useWithdrawalSearch = () => useContext(WithdrawalSearchContext);